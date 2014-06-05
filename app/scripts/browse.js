'use strict';
angular.module('Lunch.browse', ['matchData', 'Lunch.factory.storedUserData'])
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
  });
})
.controller('BrowseCtrl', function($rootScope, $scope, matchData, $location, requests, storedUserData){
    var userId = storedUserData.id;
    var matchId;

    var initialize = function() {
      $scope.counter = matchData.getCount();
      nextMatch();
    }; // if no data have backup

    var nextMatch = function() {
      if($scope.counter >= matchData.getMatches().length) {
        $location.path('/app/nomatches');
      } else {
        console.log(matchData.getMatches());
        console.log($scope.counter);
        $scope.firstname = matchData.getMatches()[$scope.counter].firstname;
        $scope.lastname = matchData.getMatches()[$scope.counter].lastname;
        $scope.likes = matchData.getMatches()[$scope.counter].likes;
        $scope.city = matchData.getMatches()[$scope.counter].city;
        $scope.tags = matchData.getMatches()[$scope.counter].tags;
        $scope.photo_url = matchData.getMatches()[$scope.counter].profileImage;
        matchId = matchData.getMatches()[$scope.counter].id;
        //show splash screen of come back tomorrow!
      }
    };

    initialize();

    var next = function(){
      $scope.counter++;
      matchData.nextMatch();
      nextMatch();
    };

    //records an approval for the currently displayed profile
    $scope.postDecision = function(decision) {
      next();
      //call service to send approval to db
      requests.postDecision({
          id: storedUserData.id,
          selectedUserId : matchId,
          accepted: decision
      }); // if approval header has a response that denotes a match
       //switch to the chat app
    };

});
