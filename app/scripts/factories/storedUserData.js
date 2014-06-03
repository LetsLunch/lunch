'use strict';
angular.module('Lunch.factory.storedUserData', ['Lunch.factory.localStore'])  
.factory('storedUserData', function() {
  var userData = window.localStorage['userData'];
  // console.log('locally stored user data:');
  // console.log(userData);
  if(!userData) {

  var userData = {
        'id' : null,
        'first_name': '',
        'last_name' : '',
        'likes' : {},
        'geolocation' : undefined,
        'tags' : {
                   'Javascript':false,
                   'Cake':false,
                   'Cats':false,
                   'Cars':false,
                   'Robots':false,
                   'Yoga':false,
                   'Finance':false,
                   'Startups':false
                 },
               // 'tags' : {
               //     '0':[false,'Javascript'],  // id: [pressed, tagName]
               //     '1':[false,'Cake'],
               //     '2':[false,'Cats'],
               //     '3':[false,'Cars'],
               //     '4':[false,'Robots'],
               //     '5':[false,'Yoga'],
               //     '6':[false,'Finance'],
               //     '6':[false, 'Startups'],
               // },
        'photo_url' : ''
    };
  } else {
    userData = angular.fromJson(userData);
  }
  return userData;
});
