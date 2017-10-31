var fs = require('fs');

module.exports = function ( path, content, callback) {
  fs.writeFile( path, content, callback );
};
