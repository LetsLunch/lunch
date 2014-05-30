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
  })
})
.controller('LoginCtrl', function($scope, $ionicSlideBoxDelegate ) {

});