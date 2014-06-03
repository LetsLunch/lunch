'use strict';

angular.module('Lunch.service.storedChat', [])  
  .service('storedChat', function($q) {
    // Make new chats available through promises and stash them locally
    var deferredChat;

    this.getChatPromise = function() {
      deferredChat = $q.defer();
      return deferredChat.promise();
    };

    this.getChats = function() {
      return angular.fromJson(window.localStorage['chat']);
    };

    this.postChat = function(payload) {
      var text = payload.message;
      var time = payload.timestamp;
      
      // Resolve if requested
      if (deferredChat) {
        deferredChat.resolve(text, time);
      }
      
      // Store log
      var chat = angular.fromJson(window.localStorage['chat']) || [];
      chat.push({
        text: text,
        time: time
      });
      window.localStorage['chat'] = chat;
    };
  });
  