'use strict';
angular.module('Lunch.factory.storedUserData', ['Lunch.factory.localStore'])  
.factory('storedUserData', function() {
  var userData = window.localStorage['userData'];
  // console.log('locally stored user data:');
  // console.log(userData);
  if(!userData) {

  var userData = {
        'id' : null,
        'name': '',
        'likes' : {},
        'geolocation' : undefined,
      'tags' : {
                   'Javascript':false,
                   'Cake':false,
                   'Cats':false,
                   'Cars':false,
                   'Robots':false,
                   'Yoga':false,
                   'Venture Capital':false,
                   'Lean-Startup':false
                 },
        'photo_url' : ''
    };
  } else {
    userData = angular.fromJson(userData);
  }
  return userData;
})