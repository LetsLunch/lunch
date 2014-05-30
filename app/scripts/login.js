'use strict'; 
angular.module('Lunch.login', [])
.config(function($stateProvider){
  $stateProvider
  .state('app.login', {
    url: '/login',
    views: {
      'menuContent' :{
        templateUrl: 'templates/login.html',
        controller: 'LoginCtrl'
      }
    }
  });
})
.controller('LoginCtrl', function($scope, $location, $ionicSlideBoxDelegate, OpenFB) {
  $scope.login = function() {
    OpenFB.login('public_profile,user_likes').then(
      function() {
        $location.path('/app/profile');
      },
      function() {
        console.log('uh-oh...');
      });
  };
});