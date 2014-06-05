'use strict';
angular.module('Lunch.factory.localStore', [])  
.factory('localStore', function($rootScope){
  $rootScope.$on('userDataChanged', function(event, updatedUserData){
     window.localStorage['userData'] = angular.toJson(updatedUserData);
  });
});