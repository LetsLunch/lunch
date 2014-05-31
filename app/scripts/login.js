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
.controller('LoginCtrl', function($scope, $state, $ionicSlideBoxDelegate, OpenFB) {
  $scope.login = function() {
    OpenFB.login('public_profile,user_likes').then(
      function() {
        $state.go('app.profile');
      },
      function() {
        window.alert('Login failed.');
      });
  };
});
