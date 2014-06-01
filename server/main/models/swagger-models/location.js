'use strict';
module.exports = {
 id: 'Location',

 properties: {
    zipcode: {
      type: 'string',
      description: 'zipcode from zipcoder'
    },
    city: {
      type: 'string',
      description: 'Name of City'
    },
    country: {
      type: 'string',
      description: 'Name of City'
    },
    lat: {
      type: 'string',
      description: 'Latitude'
    },
    lng: {
      type: 'string',
      description: 'Longitude'
    },
    created: {
      type: 'integer',
      description: 'Unix Time Created'
    }
  }
};
