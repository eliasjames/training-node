module.exports = function FirstPackage( aText ) {
  var art = require( 'asciify' );
  console.log( art( aText, function(err, res){ console.log(res) } ));
};
