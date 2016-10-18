'use strict';

//TODO - game started message

/**
 * @ngdoc directive
 * @name gridlerWebClientApp.directive:gameRoom
 * @description
 * # gameRoom
 */
angular.module('gridlerWebClientApp')
    .directive('gameRoom', ['GameService', '$interval', '$rootScope', 'CompletedBlocksService', function (GameService, $interval, $rootScope, CompletedBlocksService) {
        return {
            templateUrl: 'views/gameroom.html',
            restrict: 'E',
            link: function postLink(scope, element, attrs) {

                var debug = GamePrefs.DEBUG;

                var updateInterval;
                var INTERVAL_DURATION = 500;
                var index = 0;

                scope.gameStateLoaded = false;
                scope.gameSettingsLoaded = false;
                scope.state = {};
                scope.gameResult = {};
                scope.state.gamePlayers = [];
                scope.state.currentPlayer = null;
                //scope.loggedInUser = new Player("P1","Human");

                if (debug) {
                    debugInit();
                }
                else {
                    GameService.setCurrentGame(scope.joinedRoom);
                    GameService.getGameSettings().then(onGameSettingsFetched, onFail);
                }

                scope.onCellClicked = function (cell) {
                    cell.selected = !cell.selected;
                };

                /**
                 * Toggle all of the selected grid row according to its first item
                 * @param rowIndex
                 */
                scope.selectRow = function (rowIndex) {
                    var targetToToggleFrom = this.grid[rowIndex][0].selected;
                    for (var i = 0; i < scope.gameSettings.dimensions.x; i++) {
                        this.grid[rowIndex][i].selected = !targetToToggleFrom;
                    }
                    console.log("row selected", rowIndex);
                };

                /**
                 * Toggle selection of all the selected column according to its first itme
                 * @param columnIndex
                 */
                scope.selectColumn = function (columnIndex) {
                    var targetToToggleFrom = this.grid[0][columnIndex].selected;
                    for (var i = 0; i < scope.gameSettings.dimensions.y; i++) {
                        this.grid[i][columnIndex].selected = !targetToToggleFrom;
                    }
                };

                scope.EndTurn = function () {
                    GameService.endTurn().then(function (response) {
                        console.log(response);
                    })
                };

                scope.leaveRoom = function () {
                    console.log("leacein");
                    GameService.leaveGame().then(function (response) {
                        stopPollingAndGoBackToGameLobby();
                        console.log("room left...");
                    })
                };

                scope.Undo = function () {
                    GameService.undo().then(function (response) {
                        processMoveResponse(response);
                    });
                };

                scope.Redo = function () {
                    GameService.redo().then(function (response) {
                        processMoveResponse(response);
                    });
                };

                /**
                 *  Color all of the selected cells with 'color' param
                 * @param color
                 * @constructor
                 */
                scope.ColorSelection = function (color) {

                    if (debug) {
                        for (var y = 0; y < scope.grid.length; y++) {
                            var row = scope.grid[y];

                            for (var x = 0; x < row.length; x++) {

                                var cell = row[x];

                                if (cell.selected) {
                                    cell.color = color;
                                    cell.selected = false;
                                }
                            }
                        }

                        calculateCompleteBlocks();
                    }
                    else {
                        var positions = [];

                        for (var y = 0; y < scope.grid.length; y++) {
                            var row = scope.grid[y];

                            for (var x = 0; x < row.length; x++) {

                                var cell = row[x];

                                if (cell.selected) {
                                    positions.push({x: x, y: y});
                                    //cell.color = color;
                                    cell.selected = false;
                                }
                            }
                        }

                        var action = new PlayerAction(color, positions);

                        //after sending the move get the new board and update it all
                        GameService.sendMove(action).then(function (response) {

                            processMoveResponse(response);
                        });
                    }
                };

                scope.showWinner = function () {
                    scope.gameResult.gameEnded = true;
                    scope.gameResult.winnerName = "Some player"
                };

                scope.goBackToLobby = function () {
                    console.log("back to lobby!!!");
                    scope.gameResult = {};
                    $rootScope.goToGameLobby();
                };

                scope.getTimes = function (n) {
                    return new Array(n);
                };

                /**
                 * return tru if the player in the given index is the logged in user
                 * @param i
                 * @returns {boolean}
                 */
                scope.state.currentPlayerIsMe = function (i) {
                    return scope.state.gamePlayers[i].name == scope.loggedInUser.name
                };

                /**
                 * Return true if current player is logged in
                 */
                scope.isMyTurn = function () {
                    if (debug) {
                        return true;
                    }
                    else {
                        return scope.state.currentPlayer == scope.loggedInUser.name;
                    }
                };

                /**
                 * return true if game is full
                 * @returns {boolean}
                 */
                scope.isGameFull = function () {
                    if (debug) {
                        return true;
                    }
                    else {
                        return scope.state.gamePlayers.length >= scope.gameSettings.totalPlayers;
                    }
                };


                function createCompletedBlocks() {
                    scope.columnSlicesCompletedBlocks = [];
                    scope.rowSlicesCompletedBlocks = [];
                    scope.gameSettings.columnSlices.forEach(function (slice) {
                        var temp = [];
                        slice.forEach(function () {
                            temp.push(false);
                        });
                        scope.columnSlicesCompletedBlocks.push(temp);
                    });
                    scope.gameSettings.rowSlices.forEach(function (slice) {
                        var temp = [];
                        slice.forEach(function () {
                            temp.push(false);
                        });
                        scope.rowSlicesCompletedBlocks.push(temp);
                    });
                }

                /**
                 * When getting game settings, set the interval to update board
                 * @param gameSettings
                 */
                function onGameSettingsFetched(gameSettings) {
                    console.log(gameSettings);
                    scope.gameSettingsLoaded = true;
                    scope.gameSettings = gameSettings;
                    scope.grid = CreateGrid(scope.gameSettings);
                    createCompletedBlocks();

                    //start interval for general game state
                    updateInterval = $interval(GetGameState, INTERVAL_DURATION);
                }

                function debugInit() {
                    var gameSettings = getDummySettings();
                    scope.gameSettingsLoaded = true;
                    scope.gameSettings = gameSettings;
                    scope.grid = CreateGrid(scope.gameSettings);
                    createCompletedBlocks();
                }

                /**
                 * Called eac interval to update players scores/ current player playing
                 * @constructor
                 */
                function GetGameState() {

                    GameService.getGeneralGameState().then(onGeneralGameStateFetched);
                }

                function stopPolling() {
                    if (angular.isDefined(updateInterval)) {
                        $interval.cancel(updateInterval);
                        updateInterval = null;
                    }
                }

                function calculateCompleteBlocks() {
                    for (var x = 0; x < scope.gameSettings.dimensions.x; x++) {
                        scope.columnSlicesCompletedBlocks[x] = getCompletedColumnSlices(scope.gameSettings.columnSlices[x], x);
                    }

                    for (var y = 0; y < scope.gameSettings.dimensions.y; y++) {
                        scope.rowSlicesCompletedBlocks[y] = getCompletedRowSlices(scope.gameSettings.rowSlices[y], y);
                    }
                }

                /**
                 * When move response (submit/undo/redo) actions are made, process new state
                 * @param response
                 */
                function processMoveResponse(response) {

                    console.log(response);

                    scope.playerHistory = response.history;
                    scope.undoAvailable = response.undoAvailable;
                    scope.redoAvailable = response.redoAvailable;

                    var cells = response.cells;
                    for (var x = 0; x < cells.length; x++) {
                        var column = cells[x];
                        for (var y = 0; y < column.length; y++) {
                            var cell = column[y];
                            scope.grid[y][x].color = cell.color.toLowerCase();
                        }
                    }
                    calculateCompleteBlocks();
                }

                function getCompletedColumnSlices(columnSlice, index) {
                    var column = getColumn(index);

                    return CompletedBlocksService.getCompletedBlocks(columnSlice, column);
                }

                function getCompletedRowSlices(rowSlice, index) {
                    var row = getRow(index);

                    return CompletedBlocksService.getCompletedBlocks(rowSlice, row);
                }

                /**
                 * Get an array of colors representing a row giben index row index parameter
                 * @param index
                 * @returns {Array}
                 */
                function getRow(index) {
                    var row = [];

                    for (var x = 0; x < scope.gameSettings.dimensions.x; x++) {
                        row.push(scope.grid[index][x].color);
                    }

                    return row;
                }

                /**
                 * Get an array of colors representing a column given index column index parameter
                 * @param index
                 * @returns {Array}
                 */
                function getColumn(index) {
                    var column = [];

                    for (var y = 0; y < scope.gameSettings.dimensions.y; y++) {
                        column.push(scope.grid[y][index].color);
                    }

                    return column;
                }

                /**
                 * Iterate all players , if ones score hit 100, end game
                 * @returns {boolean}
                 */
                function checkIfAnyoneReached100() {
                    for (var i = 0; i < scope.state.gamePlayers.length; i++) {
                        var player = scope.state.gamePlayers[i];
                        if (player.score == 100) {
                            scope.gameResult.gameEnded = true;
                            scope.gameResult.winnerName = player.name;
                            return true;
                        }
                    }
                    return false
                }

                function checkForTurnsEnd() {

                    if (scope.state.currentRound > scope.gameSettings.totalmoves) {

                        scope.gameResult.gameEnded = true;
                        //get the best
                        var bestScore = scope.state.gamePlayers[0].score;
                        scope.gameResult.tie = true;

                        for (var i = 0; i < scope.state.gamePlayers.length; i++) {
                            var player = scope.state.gamePlayers[i];
                            if (bestScore < player.score) {
                                bestScore = player.score;
                                scope.gameResult.tie = false;
                                scope.gameResult.winnerName = player.name;
                            }
                        }

                        return true;
                    }
                    return false
                }

                function onGeneralGameStateFetched(generalGameState) {
                    scope.gameStateLoaded = true;
                    scope.state = generalGameState;
                    checkIfAnyoneReached100();
                    if (!scope.gameResult.gameEnded) {
                        checkForTurnsEnd();
                    }

                    if (scope.gameResult.gameEnded) {
                        console.log('game ended');
                        stopPolling();
                    }
                }

                function onFail() {

                }

                function CreateGrid(settings) {
                    var resultGrid = [];

                    for (var y = 0; y < settings.dimensions.y; y++) {
                        var row = [];
                        for (var x = 0; x < settings.dimensions.x; x++) {
                            var cell = new Cell(x, y);
                            row.push(cell);
                        }
                        resultGrid.push(row);
                    }

                    return resultGrid;
                }

                function stopPollingAndGoBackToGameLobby() {
                    stopPolling();
                    $rootScope.goToGameLobby();
                }

                function getDummySettings() {
                    return {
                        "solution": [{"x": 3, "y": 1}, {"x": 8, "y": 1}, {"x": 2, "y": 2}, {
                            "x": 4,
                            "y": 2
                        }, {"x": 8, "y": 2}, {"x": 1, "y": 3}, {"x": 2, "y": 3}, {"x": 3, "y": 3}, {
                            "x": 4,
                            "y": 3
                        }, {"x": 5, "y": 3}, {"x": 8, "y": 3}, {"x": 3, "y": 4}, {"x": 8, "y": 4}, {
                            "x": 3,
                            "y": 5
                        }, {"x": 8, "y": 5}, {"x": 3, "y": 6}, {"x": 8, "y": 6}, {"x": 3, "y": 7}, {
                            "x": 8,
                            "y": 7
                        }, {"x": 3, "y": 8}, {"x": 6, "y": 8}, {"x": 7, "y": 8}, {"x": 8, "y": 8}, {
                            "x": 9,
                            "y": 8
                        }, {"x": 10, "y": 8}, {"x": 3, "y": 9}, {"x": 7, "y": 9}, {"x": 9, "y": 9}, {
                            "x": 3,
                            "y": 10
                        }, {"x": 8, "y": 10}],
                        "gametype": "DynamicMultiPlayer",
                        "dimensions": {"x": 10, "y": 10},
                        "maxGameMoves": 15,
                        "totalmoves": 15,
                        "totalPlayers": 1,
                        "gametitle": "Game for one",
                        "columnSlices": [[1], [2], [1, 8], [2], [1], [1], [2], [8, 1], [2], [1]],
                        "rowSlices": [[1, 1], [1, 1, 1], [5, 1], [1, 1], [1, 1], [1, 1], [1, 1], [1, 5], [1, 1, 1], [1, 1]]
                    }
                }
            }
        };
    }]);
