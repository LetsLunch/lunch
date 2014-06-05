'use strict';

angular.module('Lunch.login', ['Lunch.logout'])

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

.controller('LoginCtrl', function($scope, $state, $ionicSlideBoxDelegate, OpenFB, push) {
  $scope.login = function() {
    OpenFB.login('public_profile,user_likes').then(
      function() {
        push.register();
        $state.go('app.profile');
      },
      function() {
        window.alert('Login failed.');
      });
  };

  $scope.updateSlide = function(index) {
    $ionicSlideBoxDelegate.$getByHandle('loginSlider').slide(index);
  };
});
