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
        var parsedRes = angular.fromJson(res);
        parsedRes.data.photo_url = parsedRes.data.profileImage;
        angular.extend($scope, parsedRes.data );
      }).catch(function(err) {
        console.error(err);
        $state.go('app.browse');
      });
    };
    
    initialize();
});