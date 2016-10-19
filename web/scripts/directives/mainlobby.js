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

                var debug = GamePrefs.DEBUG;

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
                    scope.lobbyService.getData().then(onDataFetched, onError);

                };

                scope.roomSelected = function (index) {
                    scope.selectedIndex = index;
                    scope.selectedRoom = scope.rooms[scope.selectedIndex];
                };

                scope.logOut = function () {
                    scope.lobbyService.logOut().then(function () {
                            cleanup();
                            $rootScope.logOut();
                        },
                        function (error) {
                            console.log(error);
                        })

                };

                function onRoomJoinSuccessfull(room) {
                    cleanup();
                    console.log("joined room");
                    console.log(room);
                    $rootScope.joinGame(room);
                }

                function onRoomJoinFail() {

                }

                scope.joinRoom = function (room) {
                    scope.loadMessage = "Joining room" + room;
                    scope.lobbyService.joinRoom(room).then(onRoomJoinSuccessfull, onRoomJoinFail);
                };

                /**
                 * prevent a player from joining twice to a game
                 * @returns {boolean}
                 */
                scope.playerInSelectedRoom = function() {
                    for (var i = 0; i < scope.selectedRoom.players.length; i++) {
                        var player = scope.selectedRoom.players[i];
                        if (player.name == scope.loggedInUser.name) {
                            return true;
                        }
                    }

                    return false;
                };

                scope.isSelected = function (index) {
                    return index == scope.selectedIndex;
                };

                function onFileUploaded(data) {
                    scope.uploadeErrorMessage = null;
                }

                function onUploadError(error) {
                    scope.uploadeErrorMessage = error;
                }

                scope.uploadFile = function () {
                    var file = scope.gameFile;

                    console.log('file is ');
                    console.dir(file);
                    scope.lobbyService.uploadFile(file).then(onFileUploaded, onUploadError);
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

                if (debug) {
                    onDataFetched(GamePrefs.DUMMY_LOBBY_DATA);
                }
                else {
                    serviceInterval = $interval(scope.getData, 500);
                }
            }
        };
    }]);
