'use strict';
angular.module('Lunch.nomatches', [])

.controller('NoMatchesCtrl', function($scope, $timeout) {
  $scope.time = new Date();
  // $scope.onTimeout =  function() {
  //   $scope.time--;
  //   $timeout($scope.onTimeout, 1000);
  // };
  //if time difference of 
  // $scope.onTimeout();
});