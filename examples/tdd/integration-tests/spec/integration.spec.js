describe( 'Hapi/FS integration', function(){
  var fs = require( 'fs' );
  var config = require( './test-config.js' );
	var serverScript = require( '../script.server-startup.js' );
	var server = serverScript();

  it( 'should write to a file from an HTTP call', function( done ){
    fs.unlink( config.fs.writePath, function(){
      server.inject( '/write-a-file', function(){
        fs.readFile( config.fs.writePath, 'utf8', function( err, data ){
          expect( err ).toEqual( null );
          expect( data ).toEqual( config.fs.writeContent );
          done();
        });
      });
    });
  });
});
