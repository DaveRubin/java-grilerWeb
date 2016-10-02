'use strict';

/**
 * @ngdoc directive
 * @name gridlerWebClientApp.directive:gameLobby
 * @description
 * # gameLobby
 */
angular.module('gridlerWebClientApp')
  .directive('gameLobby', function () {
    return {
      templateUrl: 'views/gamelobby.html',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        console.log(scope.gameLogbbyData.room);
        var room = scope.gameLogbbyData.room;

        scope.getIndices = function() {
          var a = [];
          for (var i = 0; i < room.size; i++) {
            a.push(i);
          }

          return a;
        }
      }
    };
  });
