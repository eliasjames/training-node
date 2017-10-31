module.exports = function() {

  var Hapi = require( 'hapi' );
  var server = new Hapi.Server();
	var config = require( './config.js' );
	var myFS = require( './factory.filesystem.js' );

  server.connection( { port: config.server.port, host: config.server.hostname } );

	server.route({
		method: 'GET',
		path: '/',
		handler: function ( request, reply) {
				reply( config.server.defaultText );
		}
	});

	server.route({
		method: 'GET',
		path: '/write-a-file',
		handler: function ( request, reply ) {
      myFS( './test.txt', 'true', function( err ){ console.log( err ); } );
      reply( config.server.defaultText );
		}
	});

	server.app.start = function( callback ) {
		( !callback ) ? callback = function(){} : undefined;
		server.start( function( err ){
			if ( err ) {
				throw err;
			}
			console.log( 'Server running at: ', server.info.uri );
			return callback(); 
		});
  };
  return server; 
};
