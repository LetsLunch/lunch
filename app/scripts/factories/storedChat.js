'use strict';

angular.module('Lunch.service.storedChat', [])
  .service('storedChat', function($q) {
    // Make new chats available through promises and stash them locally
    var deferredChat = $q.defer();

    this.getChatPromise = function() {
      return deferredChat.promise();
    };

    this.getChats = function() {
      return angular.fromJson(window.localStorage.chat);
    };

    this.deleteChats = function() {
      delete window.localStorage.chat;
    };

    this.postChat = function(payload) {
      var text = payload.message;
      var time = payload.timestamp;
      var self = !!payload.user;

      deferredChat.resolve(payload);

      // Store log
      var chat = angular.fromJson(window.localStorage.chat) || [];
      chat.push({
        text: text,
        time: time,
        self: self
      });
      window.localStorage.chat = chat;
    };
  });

