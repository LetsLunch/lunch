'use strict';
angular.module('Lunch.service.matchData', ['Lunch.factory.requests', 'Lunch.factory.storedUserData'])
.service('matchData', function(requests, storedUserData, $q){
  var counter = 0,
      matchData = [],
      trackMatchId = {};

  var processMatchData = function(matchedUsers){
    angular.forEach(matchedUsers.data, function(user){
      // client to track if server has already sent a particular matched user
      if(!trackMatchId[user.id]){
        trackMatchId[user.id] = true;
        requests.getDetails(user.id).then(function(returned){
          var likes = [],
              tags = {};
          angular.forEach(returned.data.likes, function(value){
            likes.push(value.name);
          });

           angular.forEach(returned.data.tags, function(value){
            tags[value.name] = true;
          });

          var user = {
            id: returned.data.user.id,
            firstname: returned.data.user.firstname,
            lastname: returned.data.user.lastname,
            profileImage: returned.data.user.profileImage,
            likes : likes,
            tags: tags,
            city : returned.data.user.location || undefined  //TODO this may need to be flexible to deal with city/other name tag denoting location
          };
          matchData.unshift(user);
        });
      }

    });
  };

  this.getMatches = function() {
    return matchData;
  };

  this.getCount = function() {
    return counter;
  };

  this.getMatchFromServer = function() {
    var deferredMatchData =  $q.defer();
    requests.getMatches({
       'userId': storedUserData.id
    }).then(function(match){
      processMatchData(match);
      deferredMatchData.resolve(matchData);
    })
    return deferredMatchData.promise;
  };

  this.incrementMatchedUserCounter =  function(){
    counter++;
  };

});
