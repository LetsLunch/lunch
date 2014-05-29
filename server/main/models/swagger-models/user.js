'use strict';
 module.exports = {
   id: 'User',

   properties: {
     id: {
       type: 'string',
       description: 'UUID from Facebook'
     },
     firstname: {
       type: 'string',
       description: 'Firstname of User'
     },
     lastname: {
       type: 'string',
       description: 'Lastname of User'
     },
     created: {
       type: 'integer',
       description: 'Unix Time Created'
     }
   }
 };
// module.exports = {
//   id: 'User',
//   properties: {
//     id: {
//       type: 'string',
//       description: 'UUID from LinkedIn'
//     },
//     firstname: {
//       type: 'string',
//       description: 'Firstname of User'
//     },
//     lastname: {
//       type: 'string',
//       description: 'Lastname of User'
//     },
//     email: {
//       type: 'string',
//       description: 'User Email. Set when user becomes a member. Not available to unauthenticated requests.'
//     },
//     linkedinToken: {
//       type: 'string',
//       description: 'User LinkedIn Token. Set when user becomes a member. Not available to unauthenticated requests.'
//     },
//     profileImage: {
//       type: 'string',
//       description: 'Image URL'
//     },
//     joined: {
//       type: 'integer',
//       description: 'Unix Time. Automatically set when user becomes a member.'
//     },
//     created: {
//       type: 'integer',
//       description: 'Unix Time. Automatically set when the user is created.'
//     },
//     lastLogin: {
//       type: 'integer',
//       description: 'Unix Time Last Login. Automatically set when the user logs in.'
//     }
//   }
// };