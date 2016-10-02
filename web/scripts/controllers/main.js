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
    var phases = ['loginScreen','mainLobby','gameLobby','gameRoom'];
    $scope.lobbyService = LobbyService;
    $scope.gameLogbbyData = {};
    $scope.gameLogbbyData.room =
      new Room('Room a', 3, [new Player('john', 'human'), new Player('david', 'ai')]);

    $scope.user = "David";


    $rootScope.$on($scope.lobbyService.EVENT_ON_LOGIN, function(){
      console.log("login");
      phase = 1;
    });

    $rootScope.$on($scope.lobbyService.EVENT_JOIN_GAME, function (event, args) {
      console.log("joined game" + args.room.name);
      $scope.gameLogbbyData.room = args.room;
      phase = 2;
    });

    $scope.currentPhase = function() {
      return phases[phase];
    };

    $scope.goToGameLobby = function(room) {
      console.log(room);
      phase = 2;
      //$scope.$digest();
    };

    $scope.next = function () {
      phase++;
      if (phase >= phases.length) {
        phase = 0;
      }
    }
  });
