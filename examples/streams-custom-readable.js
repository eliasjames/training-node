module.exports = function( durationMS, options ) {
  var Readable = require( 'stream' ).Readable;
  var util = require( 'util' );
  var crypto = require('crypto');

  function RandomStream( durationMS, options ) {
    Readable.call( this, options );
    this.durationMS = durationMS;
  }
  util.inherits( RandomStream, Readable );

  RandomStream.prototype._read = function( size ) {
    // size is API for big chunks - we can ignore it
    var ready = true;
    while ( ready ) {
      if ( !this.startTime ) { this.startTime = Date.now(); }
      if ( Date.now() - this.startTime > this.durationMS ) {
        this.push( null );
        ready = false;
      } else {
        this.push( crypto.randomBytes( 8 ));
        this.push( '\n' );
      }
    }
  }
  return new RandomStream( durationMS, options );
}
