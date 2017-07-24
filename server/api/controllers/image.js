'use strict';

//var userConfig = require('userConfig');

module.exports = {
  getImage: getImage
};



function getImage(req, res) {
  // variables defined in the Swagger document can be referenced using req.swagger.params.{parameter_name}

// FIXME DEBUG
console.log(__userConfig);


  var response = {};

  var random = Math.floor(Math.random() * 3);
  var urls = ['http://www.sa-travel.de/wp-content/uploads/sites/8/2015/Fotosafari/19x.jpg',
            'https://www.benny-rebel.de/wp-content/uploads/2016/06/Benny-Rebel-Fotoreise_Fotosafari-Tansania-Ruanda-Afrika_A2.jpg',
            'http://www.auto.de/magazin/customs/uploads/auto/2014/06/Miss-Tuning-auf-Foto-Safari-in-Kenia-Kalendershooting-mit-afrikanischem-Flair-misstuning001-620x400.jpg'];

  response.path = urls[random];


  res.json(response);
}
