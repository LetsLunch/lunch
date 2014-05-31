'use strict';
angular.module('Lunch.profile', ['Lunch.factories', 'openfb'])  
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
.controller('ProfileCtrl', function($scope, userData, OpenFB, Geo) {
    $scope.username;//userData.username;
    $scope.likes = [];//userData.likes;
    $scope.location = userData.location;
    $scope.tags = userData.tags;
    $scope.getLikes = function() {
        OpenFB.get('/me/likes')
        .success(function(data,status, headers, config){
          angular.forEach(data.data, function(value, key){
            if(value.name){
              $scope.likes.push(value.name);
            }
          });
        });
    };
    //only called if picture not avalible in local storage
    $scope.getPicture = function() {
        OpenFB.get('/me/picture?redirect=0&height=200&type=normal&width=200')//'/me/picture')
        .success(function(data,status, headers, config){
          console.log(data.data.url);
          var image = "<img src='" + data.data.url + "'/>";
          angular.element(document.querySelector('#userimage')).html(image);
          $scope.userimage = image; // save to local storage
        });
    };
    $scope.getDetails = function() {
        OpenFB.get('/me')
        .success(function(data,status, headers, config){
          $scope.username = data.name;
          alert(data.id);
          alert(data.updated_time);
        });
    };

    $scope.$on('$stateChangeSuccess', function(e, state) { // this triggers every time we go to the profile page, may need something else
        //these only refresh whenever there is no data in the connection and when there is an 
        //internet connection
        $scope.getDetails();
        $scope.getLikes();
        $scope.getPicture();
        Geo.getCurrentPosition();
    });
    //on scope change 
});