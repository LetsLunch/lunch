'use strict';
angular.module('Lunch.browse', ['Lunch.factory.matchData', 'Lunch.factory.storedUserData'])
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
      $scope.counter = matchData.counter;
      nextMatch();
    }; // if no data have backup

    var nextMatch = function() {
      if($scope.counter >= matchData.matches.length) {
        $location.path('/app/nomatches');
      } else {
        $scope.firstname = matchData.matches[$scope.counter].firstname;
        $scope.lastname = matchData.matches[$scope.counter].lastname;
        $scope.likes = matchData.matches[$scope.counter].likes;
        $scope.city = matchData.matches[$scope.counter].city;
        $scope.tags = matchData.matches[$scope.counter].tags;
        $scope.photo_url = matchData.matches[$scope.counter].profileImage;
        matchId = matchData.matches[$scope.counter].id;
        //show splash screen of come back tomorrow!
      }
    };

    initialize();
     
    var next = function(){
      $scope.counter++;
      $rootScope.$emit('nextMatch');
      nextMatch();
    };

    //records an approval for the currently displayed profile
    $scope.approve = function() {
      next();
      //call service to send approval to db
      //requests.postApproval(matchId, userId);
    };

    //records a disapproval for the currently displayed profile
    $scope.reject = function() {
      next();
      //call service to send rejection to db
      //requests.postRejection(matchId, userId);
    };

});