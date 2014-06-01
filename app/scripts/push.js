'use strict';

//factory for processing push notifications, based on:
//   intown.biz/2014/04/11/android-notifications/
angular.module('push', [])
  .service('push', function() {
    var pushNotification = window.plugins.pushNotification;

    var onDeviceReady = function(gcmAppId) {
      console.info('Registering with GCM servers');
      pushNotification.register(
        console.info.bind(console),
        console.error.bind(console), {
          senderID: '' + gcmAppId,
          ecb: "onNotificationGCM"
      });
    };
    
    // Register with the GCM servers
    this.init = function(gcmAppId) {
      document.addEventListener(
        'deviceready', onDeviceReady.bind(null, gcmAppId), false);
    };

    // Register with the application server
    this.register = function(id) {
      // TODO
    };

    // Unregister from the GCM servers
    this.unregister = function(id) {
      pushNotification.unregister(console.info.bind(console));
    };
  });
 
 
// ALL GCM notifications come through here. 
window.onNotificationGCM = function(e) {
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
      alert(e.payload.message);
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