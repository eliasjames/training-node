describe( 'Hapi Server', function(){
  var config = require( '../app-config.js' );
	var serverScript = require( '../script.server-startup.js' );
	var server = serverScript();

  it( 'should respond via http to /write-a-file', function( done ){
		server.start( function(){
			server.inject( 
				server.baseUrl + '/write-a-file', 
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
