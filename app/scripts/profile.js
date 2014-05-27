'use strict';
angular.module('Lunch.profile', ['Lunch.factories'])  

.controller('ProfileCtrl', function($scope, userData) {
    $scope.username = userData.username;
    $scope.likes = userData.likes;
    $scope.location = userData.location;
    $scope.tags = userData.tags;
});