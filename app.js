'use strict';

var SwaggerExpress = require('swagger-express-mw');
const path = require('path');
var express = require('express');
var app = express();


/**
 * Export globals. Handle with care...
 * @see https://gist.github.com/branneman/8048520
 */
global.__userConfig = require('./user-config');


module.exports = app; // for testing


// Redirect client calls to it.
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

app.get('/*.js', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/', req.url));
});


/*
 * Start server configuration of swagger.
 */

var config = {
  appRoot: __dirname + "/server",
  swaggerFile: __dirname + '/server/api/swagger/swagger.yaml'
};



SwaggerExpress.create(config, function(err, swaggerExpress) {
  if (err) { throw err; }

  // install middleware
  swaggerExpress.register(app);

  var port = process.env.PORT || 3000;
  app.listen(port);

  console.log('try: curl http://127.0.0.1:' + port + '/hello?name=Scott');
});
