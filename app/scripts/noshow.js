'use strict';
angular.module('Lunch.noshow', [])

.controller('NoShowCtrl', function($scope) {
  $scope.time = 10000;
  setInterval(function() {
    $scope.time -= 10;
  }, 1000);
});