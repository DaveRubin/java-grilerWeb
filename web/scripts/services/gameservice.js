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
            currentGame = game;
        };

        this.getGameSettings = function () {
            var deferred = $q.defer();
            if (false) {

                $http({
                    url: "/joinRoom",
                    header: "Access-Control-Allow-Origin",
                    method: "GET",
                    params: {
                        roomName: room.name,
                        roomCreatedBy: room.createdBy
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
         * Will return an object containing players list and current player name
         * @returns {GeneralGameState}
         */
        this.getGeneralGameState = function () {
            var restult = new GeneralGameState();
            return restult;
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