'use strict';

const Hapi = require( 'hapi' );
const FS = require( 'fs' );

const server = new Hapi.Server();
server.connection( { port: 3000, host: 'localhost' } );

server.register( require( 'inert' ), ( err )=>{
  if ( err ) {
    throw err;
  }

  server.route({
    method: 'GET',
    path: '/',
    handler: function ( request, reply ) {
      reply.file( './index.html' );
    }
  });
  server.route({
    method: 'GET',
    path: '/chat/{genre}',
    handler: function ( request, reply ) {
      reply.file( `./chat-files/${ request.params.genre }.txt` );
    }
  });
  server.route({
    method: 'POST',
    path: '/chat/{genre}',
    handler: function ( request, reply ) {
      FS.appendFile(
        `./chat-files/${ request.payload.genre }.txt`,
        request.payload.message,
        'utf8',
        ( err, data )=>{
          if (!err) {
            console.log( 'POST appended' );
            reply( 'POST appended' );
          } else {
            reply( 'appendFile errored' );
          }
        }
      );
    }
  });
});

server.start( ( err )=>{
  if ( err ) {
    throw err;
  }

  console.log( `Server running at: ${server.info.uri}` );
});
