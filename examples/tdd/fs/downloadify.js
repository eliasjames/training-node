// https://stackoverflow.com/questions/23141226/tdd-testing-with-streams-in-nodejs
var fs = require('fs'),
	request = require('request');

module.exports = function (url, path, callback) {
  request(url)
    .pipe(fs.createWriteStream(path))
    .on('finish', function () {
      callback();
    });
};
