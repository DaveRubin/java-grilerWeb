'use strict';

/**
 * @ngdoc directive
 * @name gridlerWebClientApp.directive:loginScreen
 * @description
 * # loginScreen
 */
angular.module('gridlerWebClientApp')
  .directive('loginScreen', ['LobbyService','$rootScope',function (LobbyService,$rootScope) {
    return {
      templateUrl: 'views/loginscreen.html',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        scope.loggedInUser = null;

        scope.login = {
          name:"",
          fail:false,
          failMessage:''
        };

        function onSuccess(response) {
          console.log(response.text);
          $rootScope.loggedInUser = response.user;
        }

        function onFail(response) {
          scope.login.fail = true;
          scope.login.failMessage = response.text;
        }

        scope.logIn = function() {
          scope.lobbyService.login(scope.login).then(onSuccess,onFail);
        };
      }
    };
  }]);
