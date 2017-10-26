// npm install express
var express = require( 'express' );
var app = express();

app.get( '/', function( req, res, next ) {
  res.write( 'home page' );
  res.end();
});

app.listen( 8000, function() {
  console.log( 'started at ' + new Date() );
} );
