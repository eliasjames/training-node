describe( 'Hapi Server', function(){
  var request = require( 'request' );
  var config = require( '../config.js' );
	var ServerFactory = require( '../factory.server.js' );
	var server = ServerFactory();

  it( 'smoke test', function(){
    var Hapi = require( 'hapi' );
    var smokeServer = new Hapi.Server();
    smokeServer.app.test = true;
    expect( smokeServer.app.test ).toEqual( true );
  });
  it( 'should respond via http', function( done ){
		server.start( function(){
      var url = 'http://' + config.server.hostname + ':' + config.server.port; 
			request.get( 
				url, 
				function( err, resp, body ){
					expect( err ).toBeNull();
					expect( resp.statusCode ).toEqual( 200 );
					expect( body ).toEqual( config.server.defaultText );
					server.stop();
					done();
				}
			);
			// use server.inject to test the same route
			// without  making real http call
//			server.inject( url, function( resp ){ 
//				console.log( resp );
//        expect( resp.statusCode ).toEqual( 200 );
//        expect( resp.payload ).toEqual( config.server.defaultText );
//        server.stop();
//        done();
//			});
		});
	});
});
