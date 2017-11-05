'use strict';

module.exports = function() {
  const Hapi = require('hapi');

  const server = new Hapi.Server();
  server.connection({ port: 3000, host: 'localhost' });

  server.route({
      method: 'GET',
      path: '/',
      handler: function (request, reply) {
          reply('Hello, world!');
      }
  });

  server.route({
      method: 'GET',
      path: '/{name}',
      handler: function (request, reply) {
          reply('Hello, ' + encodeURIComponent(request.params.name) + '!');
      }
  });

return server;
//  server.start((err) => {
//
//      if (err) {
//          throw err;
//      }
//      console.log(`Server running at: ${server.info.uri}`);
//  });
};
