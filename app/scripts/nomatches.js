'use strict';
angular.module('Lunch.nomatches', [])
.config(function($stateProvider){
  $stateProvider
  .state('app.noMatches', {
    url: '/nomatches',
    views: {
      'menuContent' :{
        templateUrl: 'templates/nomatches.html',
        controller: 'NoMatchesCtrl'
      }
    }
  })
})
.controller('NoMatchesCtrl', function($scope, $timeout) {
  $scope.time = new Date();
  // $scope.onTimeout =  function() {
  //   $scope.time--;
  //   $timeout($scope.onTimeout, 1000);
  // };
  //if time difference of 
  // $scope.onTimeout();
});