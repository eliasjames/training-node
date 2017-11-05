var fs = require( 'fs' );
var CounterStream = require( './streams.custom-readable.js' );
var dir = 'fs-examples';
var opFile = 'output.txt';
var opPath = dir + '/' + opFile;
var copyFile = 'copy.txt';
var copyPath = dir + '/' + copyFile;

fs.mkdir( dir,  mkdirAndWrite );

function mkdirAndWrite( err ) {
  if ( err && err.code !== 'EEXIST' ) {
    console.log( err );
  } else {
    fs.writeFile( opPath, 'initial file text', writeAndWatch );
  }
}
function writeAndWatch( err ) {
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
  } else {
    console.log( err );
  }
}

