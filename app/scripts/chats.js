'use strict'; 
angular.module('Lunch.chats', ['Lunch.factory.storedUserData'])
.config(function($stateProvider){
  $stateProvider
  .state('app.chats', {
    url: '/chats',
    views: {
      'menuContent' :{
        templateUrl: 'templates/chats.html',
        controller: 'ChatsCtrl'
      }
    }
  });
})
.controller('ChatsCtrl', function($scope, storedUserData) {
  $scope.inputtext = '';

  $scope.chatMessages = [{
    'first_name': 'Bario',
    'last_name' : 'Ancelotti',
    'messageText' : 'Such is the power of JS',
    'timestamp' : new Date(),
    'user' : true
  },
  {
    'first_name': 'Mario',
    'last_name' : 'Ancelotti',
    'messageText' : 'This is a basic Card which contains an item that has wrapping text.',
    'timestamp' : new Date(),
    'user' : true
  },
  {
    'first_name': 'Bob',
    'last_name' : 'Geldof',
    'messageText' : 'Such is the power of JS, it is irresesitable',
    'timestamp' : new Date(),
    'user' : false
  },
  {
    'first_name': 'Bob',
    'last_name' : 'Geldof',
    'messageText' : 'Such is the power of JS, it is irresesitable',
    'timestamp' : new Date(),
    'user' : false
  }];

  $scope.postMessage = function(text){
    if(text){
      console.log(storedUserData);
      $scope.chatMessages.unshift({
        'firstname': storedUserData.first_name,
        'lastname' : storedUserData.last_name,
        'messageText' : text,
        'timestamp' : new Date(),
        'user' : true 
      })
      console.log(text);

    }
  };

});
