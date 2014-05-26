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

    var initialize = function() {
      $scope.username = matchData['matches'][0].username;
      $scope.likes = matchData['matches'][0].likes;
      $scope.location = matchData['matches'][0].location;
      $scope.tags = matchData['matches'][0].tags;

      $scope.currentMatch = 0;
    }; // if no data have backup

    $scope.currentMatch = 0;

    initialize();


    $scope.noMatches = matchData['matches'] 
    //take care if the no of matches will dynamically increase, as a new match is
    //returned from the server

    //records an approval for the currently displayed profile
    $scope.approve = function() {
      console.log('user approves');
    };

    //records a disapproval for the currently displayed profile
    $scope.reject = function() {
      console.log('user disapproves');
    };

    $scope.next = function() {
      $scope
    };
});
