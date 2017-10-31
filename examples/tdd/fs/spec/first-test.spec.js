// https://stackoverflow.com/questions/23141226/tdd-testing-with-streams-in-nodejs
var rewire = require('rewire'),
    download = rewire('../downloadify'),
    stream = require('stream'),
    util = require('util');

describe('download', function () {
  it('should download a url', function (done) {
    var fakeRequest, fakeFs, FakeStream;

    FakeStream = function () {
      stream.Writable.call(this);
    };

    util.inherits(FakeStream, stream.Writable);

    FakeStream.prototype._write = function (data, encoding, cb) {
      expect(data.toString()).toEqual("hello world")
      cb();
    };

    fakeRequest = function (url) {
      var output = new stream.Readable();

      output.push("hello world");
      output.push(null);

      expect(url).toEqual('http://hello');

      return output;
    };

    fakeFs = {
      createWriteStream: function (path) {
        expect(path).toEqual('hello.txt');
        return new FakeStream();
      }
    };

    download.__set__('fs', fakeFs);
    download.__set__('request', fakeRequest);

    download('http://hello', 'hello.txt', function () {
      done();
    });

  });
});
