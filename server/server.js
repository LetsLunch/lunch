'use strict';

var express = require('express'),
    app     = express();

require('./main/config')(app);

app.listen(app.get('port'), function () {
  console.log('Listening on port ' + app.get('port'));
});
