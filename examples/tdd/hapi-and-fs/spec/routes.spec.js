describe( 'Hapi Server', function(){
  var config = require( '../config.js' );
  var baseUrl = 'http://' + config.server.hostname + ':' + config.server.port;
	var ServerFactory = require( '../factory.server.js' );
	var server = ServerFactory();

  it( 'should respond via http to /write-a-file', function( done ){
		server.start( function(){
			server.inject( 
				baseUrl + '/write-a-file', 
				function( resp ){
      //console.log( 'stopped', err );
					expect( resp.statusCode ).toEqual( 200 );
					expect( resp.payload ).toEqual( config.server.defaultText );
					server.stop();
					done();
				}
			);
		});
	});
});
