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
.controller('ChatsCtrl', function($scope, storedUserData, storedChat) {
  $scope.inputtext = '';

  // Get past messages
  $scope.chatMessages = storedChat.getChats();

  // Post new messages
  $scope.postMessage = function(text) {
    var payload = {
      message: text,
      timestamp: new Date().toISOString(),
      self: true
    };
    
    storedChat.postChat(payload);

    $scope.inputtext = '';
  };

  // Listen for incoming messages
  window.storedChat = storedChat;
  storedChat.getChatPromise().then(null, null, function(post) {
    $scope.chatMessages.push(post);
  });

});
