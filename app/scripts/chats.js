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
.controller('ChatsCtrl', function($scope, $state, storedUserData, storedChat) {
  $scope.seeProfile = function() {
    $state.go('app.matched');
  };

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
  storedChat.getChat().then(null, null, function(post) {
    $scope.chatMessages.push(post);
  });

});
