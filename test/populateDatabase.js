'use strict';

var request  = require('request'),
    namer    = require('sillyname'), // Let's have some fun with it!
    uri      = (process.env.NEO4J_URL || 'http://localhost:7474/') + 'db/data/cypher',
    json     = function (payload, cb) {
      request.post({
        uri: uri,
        json: payload
      }, cb);
    };

// Isolate the hardcoded factories
var User = function (id) {
  var name = namer().split(' ');
  
  this.id = '' + id;
  this.firstname = name[0];
  this.lastname = name[1];
  this.profileImage = 'http://www.example.com/' + id;
};
var Like = function (id) {
  var likes = [
    'Butter',
    'Creamer',
    'Buttermilk',
    'Milk',
    'Curds',
    'Cheese',
    'Whey'
  ];

  if (id >= likes.length) { throw 'Unexpected id in Like: ' + id; }
  
  this.id = '' + id;
  this.name = likes[id];
};
var Tag = function (id) {
  var tags = [
    'Cake',
    'Cars',
    'Cats',
    'Finance',
    'Javascript',
    'Robots',
    'Startups',
    'Yoga'
  ];

  if (id >= tags.length) { throw 'Unexpected id in Tag: ' + id; }

  this.id = tags[id];
  this.name = tags[id];
};
var Location = function (id) {
  var locations = [
    94108,
    49093
  ];

  if (id >= locations.length) { throw 'Unexpected id in Location: ' + id; }

  this.id = '' + locations[id];
};

// Populate test arrays
var users = [];
var likes = [];
var tags = [];
var locations = [];
for (var i = 0; i < 10; i++) {
  users.push(new User(i));
  if (i < 7) {
    likes.push(new Like(i));
    tags.push(new Tag(i));
  }
  if (i < 2) { locations.push(new Location(i)); }
}

// Create queries
var params = {
  users:     users,
  likes:     likes,
  tags:      tags,
  locations: locations
};

var relate = [];
var iUser, iTag, iLike;
for (iUser = 0; iUser < 10; iUser++) {
  relate.push('MERGE (u'+iUser+':User {id:\''+iUser+'\'})');
}
for (iTag = 0; iTag < 7; iTag++) {

  relate.push('MERGE (t'+iTag+':Tag {id:\''+tags[iTag].id+'\'})');
}
for (iLike = 0; iLike < 7; iLike++) {
  relate.push('MERGE (l'+iLike+':Like {id:\''+iLike+'\'})');
}
relate.push('MERGE (z'+94108+':Location {id:\''+94108+'\'})');
relate.push('MERGE (z'+49093+':Location {id:\''+49093+'\'})');

for (iUser = 0; iUser < 10; iUser++) {
  for (iTag = 0; iTag < 4; iTag++) {
    relate.push('CREATE UNIQUE (u'+iUser+')-[:HAS_TAG]->(t'+Math.floor(Math.random()*7)+')');
  }
  for (iLike = 0; iLike < 3; iLike++) {
    relate.push('CREATE UNIQUE (u'+iUser+')-[:LIKES]->(l'+Math.floor(Math.random()*7)+')');
    // relate.push('MERGE (u:User {id:\''+iUser+'\'}) WITH u MERGE (l:Like {id:\''+Math.floor(Math.random()*7)+'\'}) WITH u,l CREATE UNIQUE (u)-[:LIKES]->(l)');
  }
  if (iUser < 7) {
    relate.push('CREATE UNIQUE (u'+iUser+')-[:IS_AT]->(z94108)');
  } else {
    relate.push('CREATE UNIQUE (u'+iUser+')-[:IS_AT]->(z49093)');
  }
}

relate = relate.join('\n');
console.log(relate);

// Populate the big db
json({ query: 'MATCH (u)-[r]-() DELETE u,r' },
  json.bind(null,
    { query: 'MATCH (u) DELETE u' },
    json.bind(null,
      { query: 'CREATE (user:User { users })', params: params },
      json.bind(null,
        { query: 'CREATE (like:Like { likes })', params: params },
        json.bind(null,
          { query: 'CREATE (tags:Tag { tags })', params: params },
          json.bind(null,
            { query: 'CREATE (locs:Location { locations })', params: params },
            json.bind(null,
              { query: relate }
            )
          )
        )
      )
    )
  )
);
