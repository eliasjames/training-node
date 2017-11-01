describe( 'File System', function(){
	var myFS = require( '../factory.filesystem.js' );
  var fs = require( 'fs' );

  it( 'should write content to a file', function( done ){
    var writePath = './test.txt';
    var writeContent = 'true';

    fs.unlink( writePath, function(){
      myFS( writePath, writeContent, function(){
        fs.readFile( writePath, 'utf8', function( err, data ){
          expect( err ).toEqual( null );
          expect( data ).toEqual( writeContent );
          done();
        });
      });
    });
	});
});
