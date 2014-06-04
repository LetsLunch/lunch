'use strict';
angular.module('Lunch.factory.Geo', [])  
.factory('Geo', function($rootScope) {
  return {
    'getCurrentPosition' : function() {
        navigator.geolocation.getCurrentPosition(
          function(pos) {
             $rootScope.$broadcast('geolocation', pos); // update user data geolocation  
          }, 
          function(error) {
            console.log('error position: ', error);
        });
    }
  };
});
