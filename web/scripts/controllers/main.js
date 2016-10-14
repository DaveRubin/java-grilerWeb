'use strict';

/**
 * @ngdoc function
 * @name gridlerWebClientApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the gridlerWebClientApp
 */
angular.module('gridlerWebClientApp')
  .controller('MainCtrl', function ($scope,$rootScope,LobbyService) {

    var phase = 0;
    var phases = ['loginScreen','mainLobby','gameRoom'];
    $scope.lobbyService = LobbyService;
    $scope.gameLogbbyData = {};
    $scope.gameLogbbyData.room =
      new Room('Room a', 3, [new Player('john', 'human'), new Player('david', 'ai')]);


    $rootScope.$on($scope.lobbyService.EVENT_ON_LOGIN, function(){
      phase = 1;
    });

    $rootScope.$on($scope.lobbyService.EVENT_JOIN_GAME, function (event, args) {
      phase = 2;
    });

    $scope.currentPhase = function() {
      return phases[phase];
    };

    $rootScope.goToGameLobby = function(room) {
      console.log(room);
      phase = 1;
    };
  });
