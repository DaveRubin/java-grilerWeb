'use strict';

/**
 * @ngdoc directive
 * @name gridlerWebClientApp.directive:gameRoom
 * @description
 * # gameRoom
 */
angular.module('gridlerWebClientApp')
    .directive('gameRoom', ['GameService',function (GameService) {
        return {
            templateUrl: 'views/gameroom.html',
            restrict: 'E',
            link: function postLink(scope, element, attrs) {

                scope.gameStateLoaded = false;
                scope.gameSettingsLoaded = false;
                scope.loggedInUser = new Player("P2","Human");

                GameService.setCurrentGame(scope.joinedRoom);
                GameService.getGameSettings().then(onGameSettingsFetched, onFail);

                scope.onCellClicked = function (cell) {
                    console.log(cell);
                    cell.selected = !cell.selected;
                };

                //TODO  - remove this var
                var index = 0;

                /**
                 * Toggle all of the selected grid row according to its first item
                 * @param rowIndex
                 */
                scope.selectRow = function (rowIndex) {
                    var targetToToggleFrom = this.grid[rowIndex][0].selected;
                    for (var i = 0; i < GameData.dimensions[1]; i++) {
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
                    for (var i = 0; i < GameData.dimensions[0]; i++) {
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
                    scope.grid.forEach(function (row) {
                        row.forEach(function (cell) {
                            if (cell.selected) {
                                cell.color = color;
                                cell.selected = false;
                            }
                        });
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
                scope.isGameFull = function(){
                    return scope.gamePlayers.length >= scope.gameSettings.size;
                };



                function onGameSettingsFetched(gameSettings) {
                    scope.gameSettingsLoaded = true;
                    scope.gameSettings = gameSettings;
                    scope.grid = CreateGrid(scope.gameSettings);

                    scope.gamePlayers = [];
                    scope.currentPlayer = null;
                    
                    //start interval for general game state
                    GameService.getGeneralGameState().then(onGeneralGameStateFetched);
                }

                function onGeneralGameStateFetched(generalGameState) {
                    console.log(generalGameState);
                    scope.gameStateLoaded = true;
                    scope.gamePlayers = generalGameState.players;
                    scope.currentPlayer = generalGameState.currentPlayer;
                }

                function onFail() {

                }


                function CreateGrid(settings) {
                    var resultGrid = [];

                    for (var y = 0; y < settings.dimensions[1]; y++) {
                        var row = [];
                        for (var x = 0; x < settings.dimensions[0]; x++) {
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
