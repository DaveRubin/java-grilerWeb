'use strict';

/**
 * @ngdoc directive
 * @name gridlerWebClientApp.directive:mainLobby
 * @description
 * # mainLobby
 */
angular.module('gridlerWebClientApp')
    .directive('mainLobby', ["$interval",function ($interval) {
        return {
            templateUrl: 'views/mainlobby.html',
            restrict: 'E',
            link: function postLink(scope, element, attrs) {

                scope.selectedIndex = -1;
                scope.rooms = [];
                scope.users = [];
                scope.selectedRoom = null;
                scope.loadMessage = null;

                function onDataFetched(data) {
                    scope.rooms = data.games;
                    scope.users = data.users;
                    
                    if (scope.selectedIndex >=0) {
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
                }

                function onRoomJoinFail() {

                }

                scope.joinRoom = function (room) {
                    scope.loadMessage = "Joining room" + room;
                    scope.lobbyService.joinRoom(room).then(onRoomJoinSuccessfull, onRoomJoinFail);
                };

                scope.selectFile = function () {

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
                //scope.getData();
                $interval(scope.getData,100);
            }
        };
    }]);
