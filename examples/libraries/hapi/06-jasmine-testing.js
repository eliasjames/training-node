// npm install, then run this command 
// node node_modules/jasmine/bin/jasmine.js 06-jasmine-testing.js
describe( 'hapi test', ()=>{
  let OurServer, server;
  beforeEach( ()=>{
    OurServer = require( './06-routes' );
    server = OurServer();
	});
  it( 'should mock', ()=>{
		// 404
    let options = {method: "GET", url:"/a/b"};
		server.inject( options, (res) => {
			console.log('res.result', res.result);
		});
    
    // no op
		options = {method: "GET", url:"/"};
		server.inject( options, (res) => {
			console.log('res.result', res.result);
		});

    expect(1).toEqual(1);
  });
});
