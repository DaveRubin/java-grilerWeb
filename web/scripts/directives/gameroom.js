'use strict';

/**
 * @ngdoc directive
 * @name gridlerWebClientApp.directive:gameRoom
 * @description
 * # gameRoom
 */
angular.module('gridlerWebClientApp')
    .directive('gameRoom', ['GameService', '$interval', '$rootScope', function (GameService, $interval, $rootScope) {
        return {
            templateUrl: 'views/gameroom.html',
            restrict: 'E',
            link: function postLink(scope, element, attrs) {

                var updateInterval;
                var INTERVAL_DURATION = 500;
                var index = 0;

                scope.gameStateLoaded = false;
                scope.gameSettingsLoaded = false;
                scope.gamePlayers = [];
                scope.currentPlayer = null;
                //scope.loggedInUser = new Player("P1","Human");

                GameService.setCurrentGame(scope.joinedRoom);
                GameService.getGameSettings().then(onGameSettingsFetched, onFail);

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
                    console.log("column selected", columnIndex);
                };

                /**
                 *  Color all of the selected cells with 'color' param
                 * @param color
                 * @constructor
                 */
                scope.ColorSelection = function (color) {

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

                        var cells = response.cells;
                        console.log(response);
                        for (var x = 0; x < cells.length; x++) {
                            var column = cells[x];
                            for (var y = 0; y < column.length; y++) {
                                var cell = column[y];
                                scope.grid[y][x].color = cell.color.toLowerCase();
                            }

                        }
                    });
                };

                scope.getTimes = function (n) {
                    return new Array(n);
                };

                scope.addPlayer = function () {
                    scope.gamePlayers.push(new Player("New Player", "AI"));
                };

                scope.nextPlayerTurn = function () {
                    index++;
                    index = index % scope.gamePlayers.length;
                    scope.currentPlayer = scope.gamePlayers[index].name;
                };

                /**
                 * return tru if the player in the given index is the logged in user
                 * @param i
                 * @returns {boolean}
                 */
                scope.currentPlayerIsMe = function (i) {
                    return scope.gamePlayers[i].name == scope.loggedInUser.name
                };

                /**
                 * Return true if current player is logged in
                 */
                scope.isMyTurn = function () {
                    return scope.currentPlayer == scope.loggedInUser.name;
                };

                /**
                 * return true if game is full
                 * @returns {boolean}
                 */
                scope.isGameFull = function () {
                    return scope.gamePlayers.length >= scope.gameSettings.totalPlayers;
                };


                /**
                 * When getting game settings, set the interval to update board
                 * @param gameSettings
                 */
                function onGameSettingsFetched(gameSettings) {
                    console.log(gameSettings);
                    scope.gameSettingsLoaded = true;
                    scope.gameSettings = gameSettings;
                    scope.grid = CreateGrid(scope.gameSettings);

                    //start interval for general game state
                    updateInterval = $interval(GetGameState, INTERVAL_DURATION);
                }

                /**
                 * Called eac interval to update players scores/ current player playing
                 * @constructor
                 */
                function GetGameState() {

                    GameService.getGeneralGameState().then(onGeneralGameStateFetched);
                }

                function onGeneralGameStateFetched(generalGameState) {
                    scope.gameStateLoaded = true;
                    scope.gamePlayers = generalGameState.gamePlayers;
                    scope.currentPlayer = generalGameState.currentPlayer;
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
            }
        };
    }]);
