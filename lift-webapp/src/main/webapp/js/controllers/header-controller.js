'use strict';

Skeleton.Controllers.controller('HeaderController', function ($scope) {
    $scope.siteName = "Cyrus Innovation";
    $scope.appName = "AngularJS infused Lift Skeleton";
    $scope.menuItems = [
        {
            name: 'Home',
            url: '#/home'
        },
        {
            name: 'Server Resource Example',
            url: '#/example'
        },
        {
            name: 'CyrusInnovation',
            url: 'http://www.cyrusinnovation.com'
        },
        {
            name: 'Repository',
            url: 'https://github.com/JBerryCyrus/lift-skeleton'
        }
    ];
});