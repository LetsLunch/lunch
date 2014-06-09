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
  this.profileImage = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBhIPEBMSEBQQEBUWFRAWGRcVFhYXGRoaHxUVGxciGB4jGyYqGBklJRIUIy8jJScpLiwuFyQxN0AqNSYuLTABCQoKBQUFDQUFDSkYEhgpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKf/AABEIAGoAUAMBIgACEQEDEQH/xAAbAAEAAwADAQAAAAAAAAAAAAAAAwUGAQIEB//EAC8QAAIBAgMFBQkBAAAAAAAAAAABAgMRBAUxEiFBUWEikaGxwTIzcXKBstHw8SP/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8A+uAAAAdK1eMFeTSX7pzA7gqK2fq/Yjdc27eB2o5+n7cWuq3/AL4gWoIqGLhUXZafTj3EoAAAAABxOaSbeiTfcZfF4l1JuTd9bfDgaXFe7n8s/tZkwAAAkw9dwkpLg/6ajD1lOKkuK/qMmX+QzvTa5Sfkn6gWIAAAACPFe7n8s/tZkzW143hJLVxkvBmTsBwAABf5Cv8AN9ZPyRQF/kULUm+cn6L0AsQAAAAAz2cYXYndaSu/rx8/E0JV5847Ku+0nuXTjfuAowABJRp7Uox0u0jU0KCpxUY6Iz+UQi6q2urXV8DRgAAAOJSS3tpfEpcXnje6mtlc3r9ORW1aspu8m5PrvAva+d04+zeb36bl4lJiK7qScpasiAAAAc3LjCZ4rJVE+W0vXqUwA1lHExmrxafAkMge3D5vUhq9tcn+QPCAAAAAAAAAAAAAAAAAAAAAAAAAAP/Z';
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
  var locations = [{
    id: '94108',
    zipcode: '94108',
    city: 'San Francisco',
    state: 'CA'
  },
  {
    id: '94043',
    zipcode: '94043',
    city: 'Mountain View',
    state: 'CA'
  }];
    

  if (id >= locations.length) { throw 'Unexpected id in Location: ' + id; }

  this.id = locations[id].id;
  this.zipcode = locations[id].zipcode;
  this.city = locations[id].city;
  this.state = locations[id].state;
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
