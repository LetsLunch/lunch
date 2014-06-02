'use strict'; 

//factory for processing push notifications, based on:
//   intown.biz/2014/04/11/android-notifications/
angular.module('push', ['openfb'])
  .service('push', function(OpenFB) {
    var pushNotification;

    var onDeviceReady = function(gcmAppId) {
      // Hide pushNotification definition in scope,
      // as it is undefined until document is 'deviceready'
      pushNotification = window.plugins.pushNotification;

      console.info('Registering with GCM servers');
      pushNotification.register(
        function(e) { console.info(e); },
        function(e) { console.error(e); }, {
          'senderID': '' + gcmAppId,
          'ecb': 'onNotificationGCM'
      });
    };
    
    // Register with the GCM servers
    this.init = function(gcmAppId) {
      document.addEventListener(
        'deviceready', onDeviceReady.bind(null, gcmAppId), false);
    };

    // Register with the application server
    this.register = function(gcmToken) {
      OpenFB.checkLogin().then(function(fbToken) {
        // Send server id, fbId
      });
    };

    // Unregister from the GCM servers
    this.unregister = function() {
      pushNotification.unregister(console.info.bind(console));
    };
  });
 
// ALL GCM notifications come through here. 
function onNotificationGCM(e) {
  if (e.event === 'registered') {
      if ( e.regid.length > 0 ) {
        console.log('REGISTERED with GCM Server -> REGID: ' + e.regid);
        var elem = angular.element(document.querySelector('[ng-app]'));
        var injector = elem.injector();
        var push = injector.get('push'); // Assumes ng-app is a dependent
        push.register(e.regid);
      }
  } else if (e.event === 'message') {
    // Foreground notification
    if (e.foreground) {
      // TODO: foreground messages

      // if the notification contains a soundname, play it.
      //var my_media = new Media("/android_asset/www/"+e.soundname);
      //my_media.play();
      window.alert(e.payload.message);
    // Background notification
    } else {   
      // TODO: background messages
      if (e.coldstart) {

      } else {

      }

      // direct user here:
      // DON'T DO THIS: window.location = "#/tab/featured";
    }
  }
};
