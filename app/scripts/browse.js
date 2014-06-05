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

.controller('BrowseCtrl', function($rootScope, $state, $scope, matchData, $location, requests, OpenFB, match){
    var matchId;
    var matchedData = matchData.getMatches();

    var renderMatch = function(match){
        match.photo_url = match.profileImage;
        matchId = match.id;
        angular.extend($scope, match);
    };

    var next = function(){
      if(matchedData.length){
        renderMatch(matchedData.unshift());
      } else {
        matchData.getMatches().then(function(data){
          if (data.length) {
            matchedData = data;
            next();
          } else {
            $state.go('app.nomatches')
          }
        });
      }
    };

    next();

    // records an approval for the currently displayed profile
    $scope.postDecision = function(decision){
      // call service to send approval to db
      OpenFB.checkLogin(function(id){
        requests.postDecision({
            id: id,
            selectedUserId : matchId,
            accepted: decision
        })
        .then(function(returnedData){
          var parsedData = angular.fromJson(returnedData);
            if(parsedData.id){
              match = parsedData.id;
              $state.go('app.matched');
            }
          next();
        });
      });
    };

});
