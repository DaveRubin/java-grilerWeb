'use strict';

/**
 * @ngdoc function
 * @name gridlerWebClientApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the gridlerWebClientApp
 */
angular.module('gridlerWebClientApp')
    .controller('MainCtrl', function ($scope, $rootScope, LobbyService) {
        var debug = GamePrefs.DEBUG;
        var phase = debug? 2:0;
        var phases = ['loginScreen', 'mainLobby', 'gameRoom'];
        $scope.lobbyService = LobbyService;
        $scope.gameLogbbyData = {};
        $scope.gameLogbbyData.room =
            new Room('Room a', 3, [new Player('john', 'human'), new Player('david', 'ai')]);


        $rootScope.$on($scope.lobbyService.EVENT_ON_LOGIN, function () {
            phase = 1;
        });

        $rootScope.loginAs = function (user) {
            $rootScope.loggedInUser = user;
            phase = 1;
        };

        $rootScope.logOut = function () {
            $rootScope.loggedInUser = null;
            phase = 0;
        };

        $rootScope.joinGame = function (game) {
            phase = 2;
            $rootScope.joinedRoom = game;
        };

        $scope.currentPhase = function () {
            return phases[phase];
        };

        $rootScope.goToGameLobby = function (room) {
            console.log(room);
            phase = 1;
        };

        $rootScope.goToLoginScreen = function () {
            phase = 0;
        };
    });
