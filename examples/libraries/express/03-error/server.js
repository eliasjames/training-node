var Exp = require( 'express' );
var app = new Exp();
var bP = require( 'body-parser' );

app.use( bP.urlencoded() );

app.get( '/player/:id', function( req, rsp ) {
  var playerId = req.params.id;
  if ( playerId === '9' ) playerId = INTENTIONAL_ERROR.HERE;
  rsp.json({
    id: playerId,
    name: 'Willie Nelson'
  });
});

app.post( '/player/', function( req, rsp ) {
  var playerName = req.body.playerName;
  rsp.json({
    id: 7,
    name: playerName
  });
});

app.get( '*', function( req, rsp ) {
  rsp.send( 'Hello World' );
});

app.use( function logger ( err, req, res, next ) {
  console.error( err, req );
  next( err );
});

app.use( function clientErrorHandler (err, req, res, next) {
  if ( req.xhr ) {
    res.status( 500 ).send( { error: 'Something failed!' } );
  } else {
    next( err )
  }
});

app.use( function genericHandler ( err, req, res, next ) {
  res.status( 500 ).send( err.message );  
});

app.listen( 3000 );
console.log( 'Listening' );
