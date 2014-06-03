'use strict';
angular.module('Lunch.factory.matchData', ['Lunch.factory.requests'])
.factory('matchData', function($rootScope){
  var counter,
      matchData,
      matchLength;

  $rootScope.$on('matches', function(e, matchData){
    counter = 0;
    // matchData = matchData;
    // matchLength = matchData.length;
  });
  counter = 0;
  matchData =  [
    {
        id : 12345,
        firstname : 'Bill',
        lastname : 'Gates',
        profileImage : 'http://mostfamousperson.net/BillGates.png',
        likes : ['Computers', 'Health', 'Kale'],
        city : 'Redmond',
        tags : {
                   'Javascript':false,
                   'Cake':false,
                   'Cats':false,
                   'Cars':true,
                   'Robots':true,
                   'Yoga':false,
                   'Finance':false,
                   'Startups':true
                 }
    },
    {
        id: 56789,
        firstname: 'Steve',
        lastname: 'Jobs',
        profileImage : 'http://www.tanld.com/Portals/0/Images/steve-jobs.jpg',
        likes : ['Design', 'Simplicity', 'Fruitarian-Diet'],
        city : 'Unknown',
        tags : {
                   'Javascript':false,
                   'Cake':false,
                   'Cats':true,
                   'Cars':false,
                   'Robots':false,
                   'Yoga':true,
                   'Finance':false,
                   'Startups':false
                 }
    }];
  
  matchLength = matchData.length;
  
  $rootScope.$on('nextMatch', function(e){
    output.counter++;
    if(counter > matchLength){
        $rootScope.$emit('nomorematches');
    };
  });
  var output = {
    'matches' : matchData || undefined,
    'counter' : counter
  };
  return output;
});