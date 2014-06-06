'use strict';

angular.module('Lunch.factory.Geo', [])  

.service('Geo', function($q) {
  var deferred = $q.defer();

  this.getCurrentPosition = function() {
    navigator.geolocation.getCurrentPosition(
      function(pos) { deferred.resolve(pos); }, 
      function(err) { deferred.reject(err); }
    );

    return deferred.promise;
  };
});
