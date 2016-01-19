angular.module('quacker').factory('user', ['$http', '$q', '$timeout',
    function ($http, $q, $timeout) {

        var quacks = [];
        var messages = [];

        var info = {};

        $http.get('/authorize').then(function (result) {
            if (result.data !== false) {
                angular.extend(info, result.data);
            }
        });

        var removeMessage = function(index) {
            messages.splice(index, 1);
        };

        var addMessage = function (type, contents, other) {
            var index = messages.length;
            messages.push({
                type: type,
                contents: contents,
                other: other
            });
            $timeout(function() {
                removeMessage(index);
            }, 2500);
        };

        var login = function (username, password) {
            return $http.post('/authorize', {
                username: username,
                password: password
            }).success(function (response) {
                angular.extend(info, response);
            }).error(function (response) {
                addMessage('error', 'Login error', response);
            });
        };

        var logout = function () {
            return $http.delete('/authorize').success(function() {
                for (var i in info) {
                    info[i] = undefined;
                }
            });
        };

        var update = function (user) {
            user.avatar = user.avatar || "";
            return $http.patch('/users', {
                password: user.password,
                email: user.email,
                avatar: user.avatar
            }).error(function(response) {
                addMessage('error', 'Error updating profile', response);
            });
        };

        var register = function (newInfo) {
            var deferred = $q.defer();
            $http.post('users', newInfo).success(function (result) {
                angular.extend(info, result);
                deferred.resolve(info);
            }).error(function (response) {
                addMessage('error', 'Error registering account', response);
            });
            return deferred.promise;
        };

        var getInfo = function (id) {
            var deferred = $q.defer();
            if (id === undefined) {
                deferred.resolve(info);
            } else {
                $http.get('/user/' + id).then(function (result) {
                    deferred.resolve(result.data);
                });
            }
            return deferred.promise;
        };

        return {
            messages: messages,
            addMessage: addMessage,
            removeMessage: removeMessage,
            info: info,
            login: login,
            update: update,
            logout: logout,
            register: register,
            getInfo: getInfo
        }
    }
]);