'use strict';
angular.module('Lunch.factory.matchData', [])
.factory('matchData', function(){
  return {
    'matches' : [
    {
        username : 'Bill Gates',
        likes : ['Computers', 'Health', 'Kale'],
        location : 'Redmond',
        tags : ['Malaria', 'PCs', 'R&D']
    },
    {
        username : 'Steve Jobs',
        likes : ['Design', 'Simplicity', 'Fruitarian-Diet'],
        location : 'Unknown',
        tags : ['Geek-chic']
    }]
  };
});