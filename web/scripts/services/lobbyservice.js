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
            this.login = function (name) {
                var deferred = $q.defer();
                that.loading = true;
                $http({
                    url: "http://localhost:8080/login",
                    header: "Access-Control-Allow-Origin",
                    method: "GET",
                    params: {
                        userName: name,
                        userType: "Human"
                    }
                }).then(function (response) {
                    console.log(response);
                    that.loading = false;
                    var data = response.data;
                    if (data.error) {
                        deferred.reject(data.text);
                    }
                    else {
                        deferred.resolve(data.text);
                        $rootScope.$emit(that.EVENT_ON_LOGIN);
                    }
                });
                // setTimeout(function () {
                //   deferred.notify('About to greet ' + name + '.');
                //   that.loading = false;
                //
                //   if (true) {
                //   }
                //   else {
                //     deferred.reject('Greeting ' + name + ' is not allowed.');
                //   }
                // }, timoutDuration);

                return deferred.promise;
            };

            /**
             * Get room list from server
             * @returns {Function}
             */
            this.getData = function () {
                var deferred = $q.defer();
                that.loading = true;
                $http.get("/getLobbyData").then(function (response) {
                    console.log(response);
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

                var fd = new FormData();
                fd.append('file', file);

                $http.post("/uploadGameFile", fd, {
                    transformRequest: angular.identity,
                    headers: {'Content-Type': undefined}
                }).success(function (response) {
                    console.log(response);
                })
                .error(function (response) {
                    console.log(response);
                });
            };

            /**
             *  join a room
             * @param room
             * @returns {Function}
             */
            this.joinRoom = function (room) {
                var deferred = $q.defer();
                that.loading = true;
                setTimeout(function () {
                    deferred.notify('About to greet ' + name + '.');
                    that.loading = false;
                    if (true) {
                        $rootScope.$emit(that.EVENT_JOIN_GAME, {room: room});
                        deferred.resolve(room);
                    }
                    else {
                        deferred.reject('en error occurred');
                    }
                }, timoutDuration);

                return deferred.promise;
            }
        };

        return new serviceObject();
        // AngularJS will instantiate a singleton by calling "new" on this function
    });