'use strict';

var Skeleton = Skeleton || {};

Skeleton.Controllers = angular.module("skeleton.controllers", []);
Skeleton.Services = angular.module("skeleton.services", ['core.services']);
Skeleton.Directives = angular.module("skeleton.directives", []);

angular.module('skeleton', ['ng', 'skeleton.controllers', 'skeleton.services', 'skeleton.directives'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/home', {templateUrl: 'static/home.html', title: 'Home'});
        $routeProvider.when('/example', {templateUrl: 'static/example.html', title: 'Example'});
        $routeProvider.otherwise({redirectTo: '/home'});
    }])
    .factory('$exceptionHandler', function ($injector) {
        return function (exception) {
            // Native JS errors are thrown as plain strings and need to be boxed into the
            // form that the UI expects (with types and error level)
            if (typeof(exception) !== 'object') {
                exception = {type: "error", message: exception.toString(), fatal: false};
            }

            // Work around the cyclic dependency by getting $rootScope from
            // the $injector instance instead
            var rootScope = $injector.get('$rootScope');
//            rootScope.trackEvent('UI Notification', exception.type, exception.message);
            rootScope.$broadcast('error', exception);
        }
    })
    .run(function ($window, $location, $rootScope) {
        /**
         * Use the DOM location.host property instead of the AngularJS $location.host() since
         * it does not include the port
         * @type {string}
         */
        $rootScope.resourceBaseUrl = $location.protocol() + "://" + $window.location.host;

        $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
            $rootScope.title = current.$$route.title;
        });
    });