'use strict';
 module.exports = {
   id: 'Push',

   properties: {
     id: {
       type: 'string',
       description: 'UUID from Facebook'
     },
     token: {
       type: 'string',
       description: 'Push registration token'
     },
     type: {
       type: 'string',
       description: 'Type of tag (gsm/apn)'
     }
   }
 };
