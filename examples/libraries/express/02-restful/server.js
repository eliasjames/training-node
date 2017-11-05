var Exp = require( 'express' );
var app = new Exp();
var bP = require( 'body-parser' );

app.use( bP.urlencoded() );

app.get( '/player/:id', function( req, rsp ) {
  var playerId = req.params.id;
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

app.listen( 3000 );
console.log( 'Listening' );
