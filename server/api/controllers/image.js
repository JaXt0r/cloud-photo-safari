'use strict';

var fs = require('fs');

var Picasa = require('picasa')

//var userConfig = require('userConfig');

module.exports = {
  getImage: getImage
};



function getImage(req, res) {
  // variables defined in the Swagger document can be referenced using req.swagger.params.{parameter_name}

  const picasa = new Picasa();


  // Get config here API Manager > Credentials https://console.developers.google.com/home/dashboard
  const config = {
    clientId     : __userConfig.googleapis.clientId,
    redirectURI  : 'http://127.0.0.1:3000',
    clientSecret : __userConfig.googleapis.clientSecret
  };

  // const authURL = picasa.getAuthURL(config);
// console.log(authURL);




// Get config here API Manager > Credentials https://console.developers.google.com/home/dashboard
  const code = '4/Ffcorb_f4GoglZp87OfYkdHL1hyLcZUisONzBqpalME#';
  // picasa.getAccessToken(config, code, (error, accessToken, refreshToken) => {
  //   console.log(error, accessToken, refreshToken)
  // })
const accessToken = 'ya29.GlumBHXsXtdbiQnNx7op0wSuYiSbR17IYyc5ELNFpK3EP2T9RwJUjxiQvwru7vw29578-xuG4lTC7w9koqWiTOzcWcF_erTHKOfT7iXgZjlTcfFL1LhcNwCuuDDA';

// picasa.getPhotos(accessToken, null, (error, photos) => {
//   console.log(error, photos)
// })


var binary


const photoData = {
  title       : 'DemoTitle',
  summary     : 'DemoDescription',
  contentType : 'image/jpeg',             // image/bmp, image/gif, image/png
  binary      : binary
}



picasa.getAlbums(accessToken, null,  (error, albums) => {
  console.log("Albums", albums);
});


  fs.readFile(__dirname + '/DSC_0235.JPG', (err, binary) => {
    const photoData = {
      title       : 'Jake the dog',
      summary     : 'Corgis ftw!',
      contentType : 'image/jpeg',
      binary      : binary
    }

    picasa.postPhoto(accessToken, '6453712105469834225', photoData, (error, response) => {
      console.log(error, response)
    })
  });

  res.json('debug');
}

// var jwtClient = new google.auth.JWT(
//   __userConfig.googleapis.client_email,
//   null,
//   __userConfig.googleapis.private_key,
//   ['https://www.googleapis.com/auth/drive.file'], // an array of auth scopes
//   null
// );
//
// jwtClient.authorize(function (err, tokens) {
//   if (err) {
//     console.log(err);
//     return;
//   }
//
//   // Make an authorized request to list Drive files.
//   drive.files.list({
//     auth: jwtClient
//   }, function (err, resp) {
//     if (err) {
//       console.log(err);
//       return;
//     }
//
//     console.log(resp);
//
//
//   });
// });
//
//
//
//
//
//
// res.json('debug');

  // var response = {};
  //
  // var random = Math.floor(Math.random() * 3);
  // var urls = ['http://www.sa-travel.de/wp-content/uploads/sites/8/2015/Fotosafari/19x.jpg',
  //           'https://www.benny-rebel.de/wp-content/uploads/2016/06/Benny-Rebel-Fotoreise_Fotosafari-Tansania-Ruanda-Afrika_A2.jpg',
  //           'http://www.auto.de/magazin/customs/uploads/auto/2014/06/Miss-Tuning-auf-Foto-Safari-in-Kenia-Kalendershooting-mit-afrikanischem-Flair-misstuning001-620x400.jpg'];
  //
  // response.path = urls[random];
  //
  //
  // res.json(response);
