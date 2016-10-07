'use strict';

/**
 * @ngdoc service
 * @name gridlerWebClientApp.GameService
 * @description
 * # GameService
 * Service in the gridlerWebClientApp.
 */
angular.module('gridlerWebClientApp')
    .service('GameService', function ($rootScope, $http, $q) {
        // AngularJS will instantiate a singleton by calling "new" on this function
        var currentGame = null;

        this.setCurrentGame = function (game) {
            console.log("setting current game to " + game);
            currentGame = game;
        };

        this.getGameSettings = function () {
            var deferred = $q.defer();
            if (true) {

                $http({
                    url: "/getGameSettings",
                    header: "Access-Control-Allow-Origin",
                    method: "GET",
                    params: {
                        roomName: currentGame.name,
                        roomCreatedBy: currentGame.createdBy
                    }
                }).then(function (response) {
                    console.log(response);
                    var data = response.data;
                    if (data.error) {
                        deferred.reject(data);
                    }
                    else {
                        deferred.resolve(data);
                    }
                });
            }
            else {
                setTimeout(function () {
                    deferred.resolve(new GameSettings());
                }, 500);
            }

            return deferred.promise;
        };

        /**
         * send a move and get back a fullGameState
         * @param playerMove
         * @returns {Function}
         */
        this.sendMove = function (playerMove) {
            var deferred = $q.defer();
            if (true) {

                $http({
                    url: "/submitMove",
                    header: {'Content-Type': 'application/json'},
                    method: "POST",
                    params: {
                        roomName: currentGame.name,
                        roomCreatedBy: currentGame.createdBy,
                        playerMove: JSON.stringify(playerMove)
                    }
                }).then(function (response) {
                    console.log(response);
                    var data = response.data;
                    if (data.error) {
                        deferred.reject(data);
                    }
                    else {
                        deferred.resolve(data);
                    }
                });
            }
            else {
                setTimeout(function () {

                    deferred.resolve(null);
                }, 500);
            }

            return deferred.promise;
        };

        /**
         * Will return an object containing players list and current player name
         * @returns {GeneralGameState}
         */
        this.getGeneralGameState = function () {
            var deferred = $q.defer();

            if (true) {

                $http({
                    url: "/getGeneralGameState",
                    header: "Access-Control-Allow-Origin",
                    method: "GET",
                    params: {
                        roomName: currentGame.name,
                        roomCreatedBy: currentGame.createdBy
                    }
                }).then(function (response) {
                    var data = response.data;
                    if (data.error) {
                        deferred.reject(data);
                    }
                    else {
                        deferred.resolve(data);
                    }
                });
            }
            else {
                setTimeout(function () {
                    var result = new GeneralGameState();
                    result.players = [new Player("P1", "Human"), new Player("P2", "Human"), new Player("P3", "AI")];
                    result.currentPlayer = result.players[0].name;
                    deferred.resolve(result);
                }, 500);
            }

            return deferred.promise;
        };

        /**
         * Get full game state for a player
         * @returns {FullGameState}
         */
        this.getFullGameState = function () {
            var result = new FullGameState();
            return result;
        }

    });
