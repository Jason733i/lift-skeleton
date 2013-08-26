'use strict';

/*Core Services */
angular.module('core.services', []).factory('HttpDataService', function ($http) {
    var API_ERROR_MESSAGE = "The server encountered a temporary error and could not complete your request. Please try again in 30 seconds.";

    return {
        get: function (url) {
            //noinspection UnnecessaryLocalVariableJS
            var promise = $http.get(url).then(function (successResponse) {
                return successResponse.data;
            }, function () {
                throw {type:"error", message:API_ERROR_MESSAGE, fatal:false};
            });

            return promise;
        },
        post: function (url, json) {
            //noinspection UnnecessaryLocalVariableJS
            var promise = $http.post(url, json).then(function (successResponse) {
                return successResponse.data;
            }, function () {
                throw {type:"error", message:API_ERROR_MESSAGE, fatal:false};
            });

            return promise;
        },
        put: function (url, json) {
            //noinspection UnnecessaryLocalVariableJS
            var promise = $http.put(url, json).then(function (successResponse) {
                return successResponse.data;
            }, function () {
                throw {type:"error", message:API_ERROR_MESSAGE, fatal:false};
            });

            return promise;
        }
    }
});