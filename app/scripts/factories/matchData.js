'use strict';
angular.module('Lunch.service.matchData', ['Lunch.factory.requests'])
.service('matchData', function(requests){
  var counter = 0,
      matchData = [];

  this.processMatchData = function(matchedUsers){
    angular.forEach(matchedUsers.data, function(user){
      requests.getDetails(user.id).then(function(returned){
        var likes = [],
            tags = {  // TODO: post MVP set displayed tags
                      // based on what was locally stored
                       'Javascript':false,
                       'Cake':false,
                       'Cats':false,
                       'Cars':true,
                       'Robots':true,
                       'Yoga':false,
                       'Finance':false,
                       'Startups':true
                   };
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

    });
  };

  this.getMatches = function() {
    return matchData;
  };

  this.getCount = function() {
    return counter;
  };

  this.incrementMatchedUserCounter =  function(){
    counter++;
  };

});
