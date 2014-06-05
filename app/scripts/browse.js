'use strict';
angular.module('Lunch.browse', ['Lunch.service.matchData', 'Lunch.factory.storedUserData'])
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
.controller('BrowseCtrl', function($rootScope, $state, $scope, matchData, $location, requests, storedUserData){
    var userId = storedUserData.id;
    var matchId;
    var matchedData = matchData.getMatches();
    $scope.counter = matchData.getCount();


    var renderMatch = function() {
      if($scope.counter >= matchedData.length) {
        $state.go('app.nomatches');
      } else {
        var userData = matchedData[$scope.counter];
        $scope.firstname = userData.firstname;
        $scope.lastname = userData.lastname;
        $scope.likes = userData.likes;
        $scope.city = userData.city;
        $scope.tags = userData.tags;
        $scope.photo_url = userData.profileImage;
        matchId = userData.id;
        // TODO: show splash screen of come back tomorrow!
      }
    };

    renderMatch();

    var next = function(){
      if($scope.counter < matchedData.length){
        $scope.counter++;
        matchData.incrementMatchedUserCounter();
        renderMatch();
      }
      // initiate fetching a match from the server after user
      // approves / declines
      // Set matched data array of user objects to updated matched data array
      //of users, only when the match has been returned from the server and processed
      matchData.getMatchFromServer().then(function(data){
        matchedData = data;
      });

    };

    // records an approval for the currently displayed profile
    $scope.postDecision = function(decision) {
      next();
      // call service to send approval to db
      requests.postDecision({
          id: storedUserData.id,
          selectedUserId : matchId,
          accepted: decision
      })
      .then(function(returnedData){
        var parsedData = angular.fromJson(returnedData);
          if(returnedData.id){      // TO DO - check against above matchId
            $state.go('app.matched');
          }
      });
    };

});
