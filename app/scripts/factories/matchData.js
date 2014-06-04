'use strict';
angular.module('Lunch.factory.matchData', ['Lunch.factory.requests'])
.factory('matchData', function($rootScope, requests){
  var counter = 0,
      matchData = [];

  $rootScope.$on('matches', function(){
    console.log('matches event listener');
  });

  var processMatchData = function(id){
      var user = requests.getDetails(id);

      user.then(function(returned){
        console.log(returned.data);
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
          city : returned.data.user.location || undefined  // this needs to be fixed
        };
        // angular.forEach(returned.data.tags, function(value))
        //need to store and display the matched user once fetched
        matchData.unshift(user);
      });
  };

  $rootScope.$on('nextMatch', function(e){
    output.counter++;
    if(counter > matchData.length){
      $rootScope.$emit('nomorematches');
    }
  });

  var output = {
    'matches' : matchData || undefined,
    'counter' : counter,
    'processMatchData' : processMatchData
  };

  return output;
});