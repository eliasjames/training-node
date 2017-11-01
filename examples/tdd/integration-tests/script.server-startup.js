module.exports = function(){
  var config = require( './app-config.js' );
  var ServerFactory = require( './factory.server.js' );
  var server = ServerFactory();
  server.baseUrl = 'http://' + config.server.hostname + ':' + config.server.port;
  return server;
};
