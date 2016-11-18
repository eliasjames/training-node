// npm install express
var express = require( 'express' );
var app = express();

app.get( '/users/:userid/children', function( req, res, next ) {
  res.write( 'children\n' );
  next();
});

app.get( '/users/:userid*', function( req, res, next ) {
  res.write( 'user\n' );
  next();
});

app.get( '/', function( req, res, next ) {
  res.write('home page');
  next();
});

app.get( '/users/:userid', function( req, res, next ) {
  res.write( 'userid with nothing following\n' );
  next();
});

app.get( '*', function( req, res, next ) {
  res.end();
});

// order matters
// this will never get called
// because wild card above swallows all
app.get( '/users', function( req, res, next ) {
  res.write( 'users with nothing following\n' );
  next();
});

app.listen( 8000, function() {
  console.log( 'started at ' + new Date() );
} );
