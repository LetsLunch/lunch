'use strict';
 module.exports = {
   id: 'Like',

   properties: {
     id: {
       type: 'string',
       description: 'UUID from Facebook'
     },
     name: {
       type: 'string',
       description: 'Name of like'
     },
     created: {
       type: 'integer',
       description: 'Unix Time Created'
     }
   }
 };
