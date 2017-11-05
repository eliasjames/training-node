var Exp = require( 'express' );
var app = new Exp();

app.get( '*', function( req, rsp ) {
  rsp.send( 'Hello World' );
});

app.listen( 3000 );
console.log( 'Listening' );
