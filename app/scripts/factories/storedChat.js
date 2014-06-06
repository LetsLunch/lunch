'use strict';

angular.module('Lunch.service.storedChat', ['Lunch.factory.requests'])
  .service('storedChat', function($window, $q, requests, match) {
    // Make new chats available through promises and stash them locally
    var deferredChat = $q.defer();

    this.getChatPromise = function() {
      return deferredChat.promise;
    };

    this.getChats = function() {
      return angular.fromJson($window.localStorage.chat) || [];
    };

    this.deleteChats = function() {
      delete window.localStorage.chat;
    };

    this.postChat = function(payload) {
      var text = payload.message;
      var time = payload.timestamp;
      var self = !!payload.user;
      
      deferredChat.notify(payload);
      
      // Store log
      var chat = angular.fromJson(window.localStorage.chat) || [];
      chat.push({
        message: text,
        timestamp: time,
        self: self
      });
      $window.localStorage.chat = angular.toJson(chat);

      // Send to match
      requests.postChat(match.id, payload);
    };
  });

