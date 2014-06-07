'use strict';

angular.module('Lunch.service.matchData', ['Lunch.factory.requests', 'Lunch.factory.storedUserData'])
.service('matchData', function(requests, OpenFB, $q){

  var processMatchData = function(matches){
    return matches.map(function(match) {
      var user = {
        location: match.location.id,
        tags: match.tags.map(function(tag) { return tag.name; }),
        likes: match.likes.map(function(like) { return like.name; })
      };

      angular.extend(user, match.user);

      return user;
    });
  };

  this.getMatches = function() {
    var deferredMatchData =  $q.defer();

    OpenFB.checkLogin().then(function(userId) {
      return requests.getMatches({ 'userId': userId })
    }).then(function(matchData){
      deferredMatchData.resolve(
        processMatchData(matchData.data));
    });

    return deferredMatchData.promise;
  };
});
