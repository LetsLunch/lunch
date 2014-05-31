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
.controller('ProfileCtrl', function($rootScope, $scope, $ionicSlideBoxDelegate, storedUserData, OpenFB, Geo, tagOptions) {
    $scope.userData = storedUserData;
    $scope.tagOptions = tagOptions.options;
    $scope.limit  = 3;
    $scope.getLikes = function() {
        OpenFB.get('/me/likes')
        .success(function(fbLikeObj,status, headers, config){
          if(fbLikeObj.data !== $scope.userData.likes){  // warning this could end up duplicating likes (like id?)
            angular.forEach(fbLikeObj.data, function(value, key){
              if(value.name && !$scope.userData.likes[value.id]){
                $scope.userData.likes[value.id] = value.name;
              }
            });
          }
        });
    };

    $scope.getPicture = function() {
        OpenFB.get('/me/picture?redirect=0&height=200&type=normal&width=200')//'/me/picture')
        .success(function(data,status, headers, config){
          if(data !== $scope.userData.photo_url){
            var image = "<img src='" + data.data.url + "'/>";
            angular.element(document.querySelector('#userimage')).html(image);
          } else {
            $scope.userData.photo_url = image; 
          }
        });
    };

    $scope.getDetails = function() {
        OpenFB.get('/me')
        .success(function(data,status, headers, config){
          $scope.userData.name = data.name;
          $scope.userData.id = data.id;
          $scope.userData.updated_time = data.updated_time;
        });
    };

    $rootScope.$on('geolocation', function(event, geoposition){
      // console.log(event);
      $scope.userData.geolocation = geoposition;
    })
    // console.log($rootScope);

    $scope.$on('$stateChangeSuccess', function(e, state) { // this triggers every time we go to the profile page, may need something else
        //these only refresh whenever there is no data in the connection and when there is an 
        //internet connection
        $scope.getDetails();
        $scope.getLikes();
        $scope.getPicture();
        Geo.getCurrentPosition();

        // $rootScope.emit('userDataChanged', $scope.userData)
    });
    //on scope change 
});
