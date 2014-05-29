'use strict';
angular.module('Lunch.profile', ['Lunch.factories'])  
.config(function($stateProvider) {
  $stateProvider
  .state('app.profile', {
    url: '/profile',
    views: {
      'menuContent' :{
        templateUrl: 'templates/profile.html',
        controller: 'ProfileCtrl'
      }
    }
  })
})
.controller('ProfileCtrl', function($scope, userData) {
    $scope.username = userData.username;
    $scope.likes = userData.likes;
    $scope.location = userData.location;
    $scope.tags = userData.tags;
});