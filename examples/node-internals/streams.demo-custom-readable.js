var custRead = require( './streams.custom-readable.js' )( 100 );
custRead.pipe( process.stdout );
