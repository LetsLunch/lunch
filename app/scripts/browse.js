'use strict';
angular.module('Lunch.browse', ['Lunch.factory.matchData'])
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
.controller('BrowseCtrl', function($rootScope, $scope, matchData, $location){

    $scope.numMatches = matchData.matches.length;
    var initialize = function() {
      if(!$scope.currentMatch) {
        $scope.currentMatch = 0; // this should be persistent (currently this resets)
      } else {
        console.log($scope.currentMatch);
      }
      nextMatch($scope.currentMatch);
      $rootScope.$on('$stateChangeStart', function(){
        //when we leave page keep a track of the current match id
      });
    }; // if no data have backup

    var nextMatch = function(i) {
      if($scope.currentMatch < $scope.numMatches) {
        $scope.firstname = matchData.matches[i].firstname;
        $scope.lastname = matchData.matches[i].lastname;
        $scope.likes = matchData.matches[i].likes;
        $scope.city = matchData.matches[i].city;
        $scope.tags = matchData.matches[i].tags;
        $scope.photo_url = matchData.matches[i].profileImage;
      } else {
        $location.path('/app/nomatches');
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

    $scope.showPair = function() {
      // this function will switch the screen to the matched screen
      $location.path('/app/pair');
    };
    //

});