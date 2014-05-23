var express = require('express'),
    app     = express(),
    server  = require('http').createServer(app);

require('./main/config')(app, server);

app.listen(app.get('port'), function () {
  console.log('Listening on port ' + app.get('port'));
});
