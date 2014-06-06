'use strict';

angular.module('Lunch.service.matchData', ['Lunch.factory.requests', 'Lunch.factory.storedUserData'])
.service('matchData', function(requests, OpenFB, $q){

  var processMatchData = function(matches){
    var matchData = [];

    angular.forEach(matches, function(user){
      // Every user is returned in a promise
      var userPromise = $q.defer();
      matchData.unshift(userPromise);
      requests.getDetails(user.id).then(function(details){
        var user = {},
            likes = [],
            tags = {};

        angular.forEach(details.data.likes, function(value){
          likes.push(value.name);
        });

         angular.forEach(details.data.tags, function(value){
          tags[value.name] = true;
        });

        details.user.likes = likes;
        details.user.tags = tags;
        details.user.city = details.data.user.location || undefined;
        angular.extend(user, details.user);

        userPromise.resolve(user);
        });
    });

    // Only resolve when all user promises resolve
    return $q.all(matchData);
  };

  this.getMatches = function() {
    var deferredMatchData =  $q.defer();

    OpenFB.checkLogin().then(function(id) {
      return requests.getMatches({ 'userId': id })
    }).then(function(matchData){
      return processMatchData(matchData.data)
    }).then(function(processedData){
      deferredMatchData.resolve(processedData);
    });

    return deferredMatchData.promise;
  };
});
