'use strict';
angular.module('Lunch.browse', ['Lunch.factories'])
.config(function($stateProvider){
  $stateProvider
  .state('app.browse', {
      url: '/browse',
      views: {
        'menuContent' :{
          templateUrl: 'templates/browse.html',
          controller: 'BrowseCtrl'
        }
      }
    })
})
.controller('BrowseCtrl', function($scope, userData, matchData, $location){

    $scope.numMatches = matchData.matches.length;
    var initialize = function() {
      $scope.currentMatch = 0; // this should be persistent (currently this resets)
      nextMatch($scope.currentMatch);
    }; // if no data have backup

    var nextMatch = function(i) {
      if($scope.currentMatch < $scope.numMatches) {
        $scope.username = matchData.matches[i].username;
        $scope.likes = matchData.matches[i].likes;
        $scope.location = matchData.matches[i].location;
        $scope.tags = matchData.matches[i].tags;
      } else {
        $location.path('/app/noMatches');
        //show splash screen of come back tomorrow!
      }
    };
    //take care if the no of matches will dynamically increase, as a new match is
    //returned from the server
    initialize();

    //records an approval for the currently displayed profile
    $scope.approve = function() {
      $scope.currentMatch++;
      nextMatch($scope.currentMatch);
      //call service to send approval to db
    };

    //records a disapproval for the currently displayed profile
    $scope.reject = function() {
      $scope.currentMatch++;
      nextMatch($scope.currentMatch);
      //call service to send rejection to db
    };

});