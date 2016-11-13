var MongoClient = require( 'mongodb' ).MongoClient;
var async = require( 'async' );
var cp = require( 'child_process' );
var assert = require( 'assert' );

// Default Connection URL 
var url = 'mongodb://localhost:27017/myproject';

async.waterfall([
  function( cb ) {
    startMongo( cb );
  }, 
  function( db, cb ) {
    insertDocuments( db, cb );
  }
], function( err, results ) { 
  console.log( 'series finished', err ); 
});

function insertDocuments( db, cb ) {
  try {
    var collection = db.collection( 'documents' );
    collection.insertMany([
      { a : 1 }, { a : 2 }, { a : 3 }
    ], function( err, result ) {
      assert.equal( err, null );
      assert.equal( 3, result.result.n );
      assert.equal( 3, result.ops.length );
      console.log( 'Inserted 3 documents into the document collection' );
      cb( result );
    });
  } catch ( e ) {
    return cb( e );
  }
}
function startMongo( cb ) {
  try {
    cp.exec( 'mongod --dbpath=/data --port 27017', function ( err, stdout, stderr ) {
        MongoClient.connect( url, function( err, db ) {
          if ( err ) { return writeCb( e ); }
          return cb( null, db );
        });
    }); 
  } catch ( e ) {
    return cb( e );
  }
}
