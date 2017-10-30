module.exports = function( max, min ) {
  if ( !min ) min = 0;
  function rando() {
    return Math.floor( Math.random() * ( max - min ) + min ); 
  }

  return rando;
};
