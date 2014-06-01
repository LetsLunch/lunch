'use strict';
angular.module('Lunch.factories', [])

.factory('storedUserData', function() {
  var userData = window.localStorage['userData'];
  console.log('locally stored user data:');
  console.log(userData);
  if(!userData) {

  var  userData = {
        'id' : null,
        'name': '',
        'likes' : {},
        'geolocation' : undefined,
        'tags' : [],
        'photo_url' : ''
    };
  } else {
    userData = angular.fromJson(userData);
  }
  return userData;
})
.factory('tagOptions', function(){
  return {
    'options': ['Javascript','Cake', 'Cats', 'Cars','Robots']
  };
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
.factory('Geo', function($rootScope) {
  return {
    'getCurrentPosition' : function() {
        navigator.geolocation.getCurrentPosition(
          function(pos) {
             $rootScope.$emit('geolocation', pos); // update user data geolocation  
          }, 
          function(error) {
            console.log('error position: ', error);
        });
    }
  };
})
.factory('localStore', function($rootScope){
  $rootScope.$on('userDataChanged', function(event, updatedUserData){
     window.localStorage['userData'] = angular.toJson(updatedUserData);
  });

});
