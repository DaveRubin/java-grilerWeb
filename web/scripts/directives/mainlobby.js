'use strict';

/**
 * @ngdoc directive
 * @name gridlerWebClientApp.directive:mainLobby
 * @description
 * # mainLobby
 */
angular.module('gridlerWebClientApp')
    .directive('mainLobby', ["$interval", "$rootScope", function ($interval, $rootScope) {
        return {
            templateUrl: 'views/mainlobby.html',
            restrict: 'E',
            link: function postLink(scope, element, attrs) {

                scope.selectedIndex = -1;
                scope.rooms = [];
                scope.users = [];
                scope.selectedRoom = null;
                scope.loadMessage = null;

                var serviceInterval;

                function onDataFetched(data) {
                    scope.rooms = data.games;
                    scope.users = data.users;

                    if (scope.selectedIndex >= 0) {
                        scope.selectedRoom = scope.rooms[scope.selectedIndex];
                    }
                }

                function onError() {
                }

                scope.getData = function () {
                    //scope.loadMessage = "Fetching data";
                    scope.lobbyService.getData().then(onDataFetched, onError)
                };

                scope.roomSelected = function (index) {
                    scope.selectedIndex = index;
                    scope.selectedRoom = scope.rooms[scope.selectedIndex];
                };

                function onRoomJoinSuccessfull(room) {
                    cleanup();
                    console.log("joined room");
                    console.log(room);
                    $rootScope.joinedRoom = room;
                }

                function onRoomJoinFail() {

                }

                scope.joinRoom = function (room) {
                    scope.loadMessage = "Joining room" + room;
                    scope.lobbyService.joinRoom(room).then(onRoomJoinSuccessfull, onRoomJoinFail);
                };

                scope.isSelected = function (index) {
                    return index == scope.selectedIndex;
                };

                scope.uploadFile = function () {
                    var file = scope.gameFile;

                    console.log('file is ');
                    console.dir(file);
                    scope.lobbyService.uploadFile(file);
                };

                function cleanup() {
                    console.log("------------------------");
                    console.log("cleanup");
                    console.log("------------------------");
                    if (angular.isDefined(serviceInterval)) {
                        $interval.cancel(serviceInterval);
                        serviceInterval = null;
                    }
                }

                serviceInterval = $interval(scope.getData, 500);
            }
        };
    }]);
