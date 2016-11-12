var CustomTransform = require( './streams-transform' )();
var cT = new CustomTransform();

process.stdin
  .pipe( cT )
  .pipe( process.stdout );
