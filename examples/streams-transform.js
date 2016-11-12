module.exports = function() {
  var util = require( 'util' );
  var Transform = require( 'stream' ).Transform;

  function Translator() {
    Transform.call( this );
  }
  util.inherits(Translator, Transform);
  Translator.prototype._transform = function( chunk, enc, cb ) {
    this.push( chunk.toString().toUpperCase());
    // IMPORTANT: need to call cb() 
    // to indicate processing is finished
    cb();
  };

  return Translator;
}
