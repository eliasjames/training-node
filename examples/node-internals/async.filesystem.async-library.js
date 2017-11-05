var fs = require( 'fs' );
var CounterStream = require( './streams.custom-readable.js' );
// npm install async for this to work
var async = require('async');
var dir = 'fs-examples';
var opFile = 'output.txt';
var opPath = dir + '/' + opFile;
var copyFile = 'copy.txt';
var copyPath = dir + '/' + copyFile;

async.series([
  function( mkdirCb ) {
    fs.mkdir( dir, function mkdirErrHandler( err ) {
      if ( !err || ( err && err.code === 'EEXIST' )) {
        return mkdirCb();
      } else {
        return mkdirCb( err );
      }
    });
  },
  function( writeCb ) {
    try {
      var cS = new CounterStream( 100 );
      var opWS = fs.createWriteStream( opPath );
      fs.watch( opPath, function( eventType, filename ) {
        if ( eventType === 'change' ) {
          fs.createReadStream( opPath ).pipe(
            fs.createWriteStream( copyPath )
          );
        }
      });
      cS.pipe( opWS );

      return writeCb();
    } catch ( e ) {
      return writeCb( e );
    }
  }
], function( err, results ) { 
  console.log( 'series finished', err ); 
});

