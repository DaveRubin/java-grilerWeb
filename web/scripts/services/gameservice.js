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
                        id: currentGame.id
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
            $http({
                url: "/submitMove",
                header: {'Content-Type': 'application/json'},
                method: "POST",
                params: {
                    id: currentGame.id,
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

            return deferred.promise;
        };

        this.endTurn = function () {
            var deferred = $q.defer();
            $http({
                url: "/endMove",
                header: {'Content-Type': 'application/json'},
                method: "POST",
                params: {
                    id: currentGame.id
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

            return deferred.promise;
        };

        /**
         * Will return an object containing players list and current player name
         * @returns {GeneralGameState}
         */
        this.getGeneralGameState = function () {
            var deferred = $q.defer();

            $http({
                url: "/getGeneralGameState",
                header: "Access-Control-Allow-Origin",
                method: "GET",
                params: {
                    id: currentGame.id,
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
