var CustomTransform = require( './streams.custom-transform' )();
var cT = new CustomTransform();

process.stdin
  .pipe( cT )
  .pipe( process.stdout );
