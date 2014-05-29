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
  // $scope.nextSlide = function(){
  //   if($scope.forwards){
  //     $ionicSlideBoxDelegate.next();
  //   } else {
  //     $ionicSlideBoxDelegate.previous();
  //   }
  //    console.log($ionicSlideBoxDelegate);
  // };

  // $scope.slideHasChanged = function(index){
  //   if($scope.forwards && index === 2){
  //     $scope.forwards = false
  //   }
  //   if(!$scope.forward && index === 0){
  //     $scope.forwards = true;
  //   }
  // };  

  // $scope.forwards = true;
});