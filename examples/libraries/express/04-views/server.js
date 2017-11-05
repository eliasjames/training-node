var Exp = require( 'express' );
var app = new Exp();
var bP = require( 'body-parser' );

app.set( 'view engine', 'hbs' );

app.use( bP.urlencoded() );

var usersArray = [ 'Dick', 'Jane', 'Spot' ];
app.get( '/player/:id', function( req, rsp ) {
  rsp.render( 'getPlayer', { userName: usersArray[ req.params.id ] });
});

app.listen( 3000 );
console.log( 'Listening' );
