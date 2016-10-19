'use strict';

// TODO - check for user in session ons start,and let the user log out if he wants to

/**
 * @ngdoc directive
 * @name gridlerWebClientApp.directive:loginScreen
 * @description
 * # loginScreen
 */
angular.module('gridlerWebClientApp')
    .directive('loginScreen', ['LobbyService', '$rootScope', function (LobbyService, $rootScope) {
        return {
            templateUrl: 'views/loginscreen.html',
            restrict: 'E',
            link: function postLink(scope, element, attrs) {
                scope.loggedInUser = null;

                scope.lobbyService.login().then(function (response) {
                    console.log(response);
                    scope.loggedInUser = response.user;
                });

                scope.login = {
                    name: "",
                    fail: false,
                    failMessage: ''
                };

                function onSuccess(response) {
                    console.log(response.text);
                    $rootScope.loginAs(response.user);
                }

                function onFail(response) {
                    scope.login.fail = true;
                    scope.login.failMessage = response.text;
                }

                scope.continue = function() {
                    $rootScope.loginAs(scope.loggedInUser);
                };

                scope.logIn = function () {
                    scope.lobbyService.login(scope.login).then(onSuccess, onFail);
                };
                
                scope.logOutCurrentUser = function () {
                    scope.lobbyService.logOut().then(function () {
                            scope.loggedInUser = null;
                            $rootScope.logOut();
                        },
                        function (error) {
                            console.log(error);
                        })
                }
            }
        };
    }]);
