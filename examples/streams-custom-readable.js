module.exports = function( durationMS, options ) {
  var Readable = require( 'stream' ).Readable;
  var util = require( 'util' );

  function CounterStream( durationMS, options ) {
    Readable.call( this, options );
    this.durationMS = durationMS;
    this.counter = 0;
  }
  util.inherits( CounterStream, Readable );

  CounterStream.prototype._read = function( size ) {
    // size is API for big chunks - we can ignore it
    var ready = true;
    while ( ready ) {
      if ( !this.startTime ) { this.startTime = Date.now(); }
      if ( Date.now() - this.startTime > this.durationMS ) {
        this.push( null );
        ready = false;
      } else {
        this.counter++;
        this.push( this.counter.toString());
        this.push( '\n' );
      }
    }
  }
  return new CounterStream( durationMS, options );
}
