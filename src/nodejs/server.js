const gdrive = '../gdrive/gdrive';

// Load the http module to create an http server.
var http = require('http');
var shell = require('shelljs');

var folderResponse = shell.exec(
  parse('%s list --no-header --query "name=\'Fotosafari-Danila\'"', gdrive)
).stdout;
const folderId = folderResponse.substr(0, folderResponse.indexOf(' '));


console.log("Folder-id is: " + folderId);


var server = http.createServer(function (request, response) {

  if (request.url === '/') {
    response.writeHead(200, {"Content-Type": "text/html"});
    response.end(shell.cat('index.html').stdout);



  } else if (request.url === '/get-image-url') {
    var elementResponse = shell.exec(
      parse("%s list --max 9999 --no-header --query \"'%s' in parents\"", gdrive, folderId),
      {silent: true}
    ).stdout;
    var elements = elementResponse.split("\n");
    var elementCount = (elements || []).length;
    var randomVal = Math.floor(Math.random() * (elementCount-1));
    var usedId = elements[randomVal].slice(0, elements[randomVal].indexOf(' '));


    response.writeHead(200, {"Content-Type": "text/plain"});
    response.end("https://drive.google.com/uc?id=" + usedId);



  } else {
    response.writeHead(404);
    response.end();
  }
});

server.listen(8000);

console.log("Server running at http://127.0.0.1:8000/");




function parse(str) {
    var args = [].slice.call(arguments, 1),
        i = 0;

    return str.replace(/%s/g, function() {
        return args[i++];
    });
}
