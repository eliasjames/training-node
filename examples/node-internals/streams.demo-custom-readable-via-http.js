var http = require('http'), 
  CustomReadable = require( './streams.custom-readable.js' ),
  fs = require('fs');

var server = http.createServer(function (req, res) {
  var custRead = new CustomReadable( 10 );
  res.writeHead(200, { 'Content-Type': 'text/html' });
  custRead.pipe( res );
});
server.listen(8000);
console.log( 'Listening at http://localhost:8000/' );
