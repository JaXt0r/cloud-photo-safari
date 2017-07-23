'use strict';

var SwaggerExpress = require('swagger-express-mw');
const path = require('path');
var express = require('express');
var app = express();


module.exports = app; // for testing


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});


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

  if (swaggerExpress.runner.swagger.paths['/hello']) {
    console.log('try this:\ncurl http://127.0.0.1:' + port + '/hello?name=Scott');
  }
});
