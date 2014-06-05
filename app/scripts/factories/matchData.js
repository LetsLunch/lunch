'use strict';
angular.module('matchData', ['Lunch.factory.requests'])
.service('matchData', function(requests){
  var counter = 0,
      matchData = [];

  // $scope.$on('matches', function(){
  //   console.log('matches event listener');
  // });

  this.processMatchData = function(matchedUsers){
    angular.forEach(matchedUsers.data, function(user){
      requests.getDetails(user.id).then(function(returned){
        var likes = [],
            tags = {  // later on it is possible to set the displayed tags
                      //based on what was locally stored
                       'Javascript':false,
                       'Cake':false,
                       'Cats':false,
                       'Cars':true,
                       'Robots':true,
                       'Yoga':false,
                       'Finance':false,
                       'Startups':true
                   };
        // console.log(returned);
        angular.forEach(returned.data.likes, function(value){
          likes.push(value.name);
          // console.log(value);
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
          city : returned.data.user.location || undefined  // this needs to be fixed
        };
        // angular.forEach(returned.data.tags, function(value))
        //need to store and display the matched user once fetched
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

  this.nextMatch =  function(e){
    counter++;
    // if(counter > matchData.length){
    //   $scope.$emit('nomorematches'); // check if this works
    // }
  };

});
