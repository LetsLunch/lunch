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
        var userData = matchedData[$scope.counter];
        $scope.firstname = userData.firstname;
        $scope.lastname = userData.lastname;
        $scope.likes = userData.likes;
        $scope.city = userData.city;
        $scope.tags = userData.tags;
        $scope.photo_url = userData.profileImage;
        matchId = userData.id;
        // TODO: show splash screen of come back tomorrow!
    };

    var next = function(){
      if($scope.counter < matchedData.length){
        renderMatch();
        matchData.incrementMatchedUserCounter();
        $scope.counter++;
      } else {
        matchData.getMatchesFromServer().then(function(data){
          matchedData = data;
          if(!matchedData.length){
            $state.go('app.nomatches')
          } else {
            // resetting the scope counter
            $scope.counter = 0;
            next();
          }
        });
      }
    };

    next();

    // records an approval for the currently displayed profile
    $scope.postDecision = function(decision) {
      // call service to send approval to db
      requests.postDecision({
          id: storedUserData.id,
          selectedUserId : matchId,
          accepted: decision
      })
      .then(function(returnedData){
        var parsedData = angular.fromJson(returnedData);
          if(returnedData.id){
            $state.go('app.matched');
          }
        next();
      });
    };

});
