var fs = require( 'fs' );
// npm install q for this to work
var q = require( 'q' );
var CounterStream = require( './streams.custom-readable.js' );
var dir = 'fs-examples';
var opFile = 'output.txt';
var opPath = dir + '/' + opFile;
var copyFile = 'copy.txt';
var copyPath = dir + '/' + copyFile;

qMkDir( dir )
  .then( qWriteStart )
  .then( writeAndWatch )
  .then( null, console.error );

function qMkDir( dir ) {
  var def = q.defer();
  fs.mkdir( dir, function( err ) {
    if ( err && err.code !== 'EEXIST' ) {
      def.reject( err );
    } else {
      def.resolve();
    }
  });
  return def.promise;
}
function qWriteStart( err ) {
  // if no custom error handling logic
  // q.nodeify will handle the base case
  var qWrite = q.denodeify( fs.writeFile );
  return qWrite( opPath, 'initial file text' );
}
function writeAndWatch( err ) {
  // we can get rid of error handling here
  // because error will fall through promise chain
  // to the first .then() with an onRejected handler
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
}
