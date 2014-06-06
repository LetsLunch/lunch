'use strict';
angular.module('Lunch.matched', ['Lunch.factory.requests'])
.config(function($stateProvider){
  $stateProvider
  .state('app.matched', {
      url: '/matched',
      views: {
        'menuContent' :{
          templateUrl: 'templates/matched.html',
          controller: 'MatchedCtrl'
        }
      }
  });
})
.controller('MatchedCtrl', function($rootScope, $scope, $state, requests, match){
    var initialize = function() {
      requests.getDetails(match.id).then(function(res) {
        res.data.photo_url = res.data.profileImage;
        angular.extend($scope,res.data);
      }).catch(function(err) {
        console.error(err);
        $state.go('app.browse');
      });
    };

    initialize();
});