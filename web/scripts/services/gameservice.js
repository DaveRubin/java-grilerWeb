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
        var EVENT_ON_LOGIN = "on-login";

        this.setCurrentGame = function (game) {
            console.log("setting current game to " + game);
            currentGame = game;
        };

        this.leaveGame = function () {
            return simplePost("/leaveGame");
            /*
             var deferred = $q.defer();
            $http({
                url: "/leaveGame",
                header: "Access-Control-Allow-Origin",
                method: "GET",
                params: {
                    roomName: currentGame.name
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
             */
        };

        this.getGameSettings = function () {
            return simplePost("/getGameSettings")
            /*
            var deferred = $q.defer();

            $http({
                url: "/getGameSettings",
                header: "Access-Control-Allow-Origin",
                method: "GET",
                params: {
                    roomName: currentGame.name
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
             */
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
                    roomName: currentGame.name,
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

        this.undo = function() {
            return simplePost("/undo");
        };

        this.redo = function() {
            return simplePost("/redo");
        };

        this.endTurn = function () {
            return simplePost("/endMove");
            /*
            var deferred = $q.defer();
            $http({
                url: "/endMove",
                header: {'Content-Type': 'application/json'},
                method: "POST",
                params: {
                    roomName: currentGame.name
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
             */
        };

        /**
         * Will return an object containing players list and current player name
         * @returns {GeneralGameState}
         */
        this.getGeneralGameState = function () {
            return simplePost("/getGeneralGameState");
            /*
            var deferred = $q.defer();

            $http({
                url: "/getGeneralGameState",
                header: "Access-Control-Allow-Origin",
                method: "GET",
                params: {
                    roomName: currentGame.name,
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
             */
        };


        function simplePost(url) {
            var deferred = $q.defer();
            $http({
                url: url,
                header: {'Content-Type': 'application/json'},
                method: "POST",
                params: {
                    roomName: currentGame.name
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
        }

    });
