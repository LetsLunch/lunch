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
.controller('MatchedCtrl', function($rootScope, $scope, $state, $window, requests, match){
    var initialize = function() {
      requests.getDetails(match.id).then(function(res) {
        var user = {
          location: res.data.location.id,
          tags: res.data.tags.map(function(tag) { return tag.name; }),
          likes: res.data.likes.map(function(like) { return like.name; })
        };

        angular.extend(res.data.user, user);
        angular.extend($scope, res.data.user);
      }).catch(function(err) {
        console.error(err);
        $state.go('app.browse');
      });
    };

    $window.localStorage.match = match.id;
    initialize();
});
