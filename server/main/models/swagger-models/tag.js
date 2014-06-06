'use strict';
 module.exports = {
   id: 'Tag',

   properties: {
     id: {
       type: 'string',
       description: 'UUID from App'
     },
     name: {
       type: 'string',
       description: 'Name of Tag'
     },
     created: {
       type: 'integer',
       description: 'Unix Time Created'
     }
   }
 };
