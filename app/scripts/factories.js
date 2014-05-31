'use strict';
angular.module('Lunch.factories', [])

.factory('storedUserData', function() {
  // return {
  //     username : 'John Doe',
  //     likes : ['Football', 'Javascript', 'Food', 'Baked-beans'],
  //     location : 'San Francisco',
  //     tags : ['Fine Wine', 'Mario 64', 'Chicken Teriaki']
  // };
  var userData = window.localStorage['userData'];
  if(!userData) {
    userData = {
        'id' : null,
        'name': '',
        'likes' : [],
        'geolocation' : {},
        'tags' : [],
        'photo_url' : ''
    };
  }
  return userData;
})
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
})
.factory('Geo', function() {
  return {
    'getCurrentPosition' : function() {
        navigator.geolocation.getCurrentPosition(function(pos) {
          console.log('found position at: ', pos);
          }, function(error) {
              console.log('error position: ', error); 
               });
    }
  };
});
