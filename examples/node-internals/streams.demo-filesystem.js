var fs = require( 'fs' );
var CounterStream = require( './streams.custom-readable.js' );
var cS = new CounterStream( 100 );
var dir = 'fs-examples';
var opFile = 'output.txt';
var opPath = dir + '/' + opFile;
var copyFile = 'copy.txt';
var copyPath = dir + '/' + copyFile;

fs.mkdir( dir, function( err ) {
  if ( err && err.code !== 'EEXIST' ) {
    console.log( err );
  } else {
    fs.writeFile( opPath, 'initial file text', function( err ) {
      if ( !err ) {
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
        console.log( 'CounterStream written' );
      } else {
        console.log( err );
      }
    });
  }
});
