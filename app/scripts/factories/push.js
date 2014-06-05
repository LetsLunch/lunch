'use strict'; 

//factory for processing push notifications, based on:
//   intown.biz/2014/04/11/android-notifications/
angular.module('push', ['openfb', 'Lunch.factory.storedUserData', 'Lunch.factory.requests'])
  .service('push', function($window, OpenFB, storedUserData, requests, gcmAPI) {
    var pushNotification;
    var isMobile;

    var register = function() {
      // Hide pushNotification definition in scope,
      // as it is undefined until document is 'deviceready'
      pushNotification = isMobile ?
        window.plugins.pushNotification :
        {
          register: console.info.bind(console, '(MockGCM) Registered'),
          unregister: console.info.bind(console, '(MockGCM) Unregistered')
        };

      console.info('Registering with GCM servers');
      pushNotification.register(
        function(e) { console.info(e); },
        function(e) { console.error(e); }, {
          'senderID': '' + gcmAPI,
          'ecb': 'onNotificationGCM'
      });
    };
    
    // Register with the GCM servers
    this.init = function() {
      document.addEventListener(
        'deviceready', function() {
          isMobile = true;
          register();
        }, false);
    };

    // Register with the application server
    this.register = function(gcmToken) {
      // Only reregister if we've registered before
      if (window.localStorage.gcmToken && !gcmToken) {
        register();
        // This prevents two registrations on first login
        return;
      }
      window.localStorage.gcmToken = gcmToken;
      OpenFB.checkLogin().then(function(fbId) {
        // Register fb id and push token with application server
        requests.postPushToken({
          id: fbId,
          token: gcmToken,
          type: 'gcm'
        });
      });
    };

    // Unregister from the GCM servers
    this.unregister = function() {
      pushNotification.unregister(console.info.bind(console));
      if (window.localStorage.gcmToken) {
        requests.deletePushToken($window.localStorage.gcmToken);
      }
    };
  });
 
// ALL GCM notifications come through here. 
function onNotificationGCM(e) {
  var elem = angular.element(document.querySelector('[ng-app]'));
  var injector = elem.injector();
  if (e.event === 'registered') {
      if ( e.regid.length > 0 ) {
        console.log('REGISTERED with GCM Server -> REGID: ' + e.regid);
        var push = injector.get('push'); // Assumes ng-app is a dependent
        push.register(e.regid);
      }
  } else if (e.event === 'message') {
    var chat = injector.get('storedChat'); // Assumes ng-app is a dependent
    chat.postChat(e.payload);
    // TODO: Differentiate FG/BG notifications
  }
}
