'use strict';

/**
 * @ngdoc service
 * @name gridlerWebClientApp.LoginService
 * @description
 * # LoginService
 * Service in the gridlerWebClientApp.
 */
angular.module('gridlerWebClientApp')
    .service('LobbyService', function ($rootScope, $http, $q) {

        var timoutDuration = 200;
        var path = window.location.pathname;
        console.log("get path - "  + path);

        var serviceObject = function () {

            //SERVICE EVENTS
            this.EVENT_ON_LOGIN = "on-login";
            this.EVENT_JOIN_GAME = "joined-game";

            var that = this;

            this.loading = false;
            /**
             * login as X
             * @param name
             * @returns {Function}
             */
            this.login = function (login) {

                var postObject = login == null ? {} : {
                    userName: login.name,
                    userType: login.type
                };
                var deferred = $q.defer();
                that.loading = true;
                $http({
                    url: path + "login",
                    header: "Access-Control-Allow-Origin",
                    method: "GET",
                    params: postObject
                }).then(function (response) {
                    console.log(response);
                    that.loading = false;
                    var data = response.data;
                    if (data.error) {
                        deferred.reject(data);
                    }
                    else {
                        deferred.resolve(data);
                    }
                });

                return deferred.promise;
            };


            /**
             * log out as current user
             */
            this.logOut = function () {
                var deferred = $q.defer();
                that.loading = true;
                $http.get(path + "logOut").then(function (response) {

                    that.loading = false;
                    var data = response.data;
                    if (data.error) {
                        deferred.reject(response.message);
                    }
                    else {
                        deferred.resolve(response.message);
                    }
                });

                return deferred.promise;
            };

            /**
             * Get room list from server
             * @returns {Function}
             */
            this.getData = function () {
                var deferred = $q.defer();
                that.loading = true;
                $http.get(path + "getLobbyData").then(function (response) {

                    that.loading = false;
                    var data = response.data;
                    if (data.error) {
                        deferred.reject("error");
                    }
                    else {
                        deferred.resolve(data);
                    }
                });

                return deferred.promise;
            };

            this.uploadFile = function (file) {
                var deferred = $q.defer();

                var fd = new FormData();
                fd.append('file', file);

                $http.post(path + "uploadGameFile", fd, {
                    transformRequest: angular.identity,
                    headers: {'Content-Type': undefined}
                }).success(function (response) {
                    console.log(response);
                    if (response.error) {
                        deferred.reject(response.message);
                    }
                    else {
                        deferred.resolve(response.message);
                    }
                })
                    .error(function (response) {
                        console.log(response);
                        deferred.reject(response);
                    });

                return deferred.promise;
            };

            /**
             *  join a room
             * @param room
             * @returns {Function}
             */
            this.joinRoom = function (room) {
                var deferred = $q.defer();
                that.loading = true;
                $http({
                    url: path + "joinRoom",
                    header: "Access-Control-Allow-Origin",
                    method: "GET",
                    params: {
                        roomName: room.name
                    }
                }).then(function (response) {
                    console.log(response);
                    that.loading = false;
                    var data = response.data;
                    if (data.error) {
                        deferred.reject(data);
                    }
                    else {
                        deferred.resolve(room);
                    }
                });

                return deferred.promise;
            }
        };

        return new serviceObject();
        // AngularJS will instantiate a singleton by calling "new" on this function
    });
