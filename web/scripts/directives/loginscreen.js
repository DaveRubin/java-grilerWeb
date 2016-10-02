'use strict';

/**
 * @ngdoc directive
 * @name gridlerWebClientApp.directive:loginScreen
 * @description
 * # loginScreen
 */
angular.module('gridlerWebClientApp')
  .directive('loginScreen', ['LobbyService',function (LobbyService) {
    return {
      templateUrl: 'views/loginscreen.html',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        scope.login = {
          name:"",
          fail:false,
          failMessage:''
        };

        function onSuccess(message) {
          console.log(message);
          scope.user()
        }

        function onFail(message) {
          scope.login.fail = true;
          scope.login.failMessage = message;
        }

        scope.logIn = function() {
          scope.lobbyService.login(scope.login.name).then(onSuccess,onFail);
        };
      }
    };
  }]);
