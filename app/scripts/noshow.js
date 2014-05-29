'use strict';
angular.module('Lunch.noshow', [])
.config(function($stateProvider){
  $stateProvider
  .state('app.noShow', {
      url: '/noShow',
      views: {
        'menuContent' :{
          templateUrl: 'templates/nomatches.html',
          controller: 'NoMatchesCtrl'
        }
      }
    })
})
.controller('NoShowCtrl', function($scope) {
  $scope.time = 10000;
  setInterval(function() {
    $scope.time -= 10;
  }, 1000);
});