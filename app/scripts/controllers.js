'use strict';
angular.module('Lunch.controllers', ['Lunch.factories'])

.controller('AppCtrl', function($scope) {
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('ProfileCtrl', function($scope, userData) {
    $scope.username = userData.username;
    $scope.likes = userData.likes;
    $scope.location = userData.location;
    $scope.tags = userData.tags;
})
  

.controller('PlaylistCtrl', function($scope, $stateParams) {
})

.controller('BrowseCtrl', function($scope, userData, matchData){

    $scope.numMatches = matchData.matches.length;
    var initialize = function() {
      $scope.currentMatch = 0;
      nextMatch($scope.currentMatch);
    }; // if no data have backup


    var nextMatch = function(i) {
      console.log('current match is, ', $scope.currentMatch);
      console.log('num matches is ', $scope.numMatches);
      if($scope.currentMatch < $scope.numMatches) {
        $scope.username = matchData.matches[i].username;
        $scope.likes = matchData.matches[i].likes;
        $scope.location = matchData.matches[i].location;
        $scope.tags = matchData.matches[i].tags;
      } else {
        console.log('matches ended');
        //show splash screen of come back tomorrow!
      }
    };
    //take care if the no of matches will dynamically increase, as a new match is
    //returned from the server
    initialize();

    //records an approval for the currently displayed profile
    $scope.approve = function() {
      console.log('user approves');
      $scope.currentMatch++;
      nextMatch($scope.currentMatch);
      //call service to send approval to db
    };

    //records a disapproval for the currently displayed profile
    $scope.reject = function() {
      console.log('user disapproves');
      $scope.currentMatch++;
      nextMatch($scope.currentMatch);
      //call service to send rejection to db
    };

});
