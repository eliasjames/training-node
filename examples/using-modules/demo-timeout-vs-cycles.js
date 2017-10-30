var now = Date.now();

function start( method ) {
  console.log( 'starting', now );
  for ( var i=0; i<10; i++ ) {
    setTimeout( oneTypicalRequest.bind( undefined, method ), 1 );
  }
}

function oneTypicalRequest( method ) {
  var randomNumberGen = require( './random-number-generator' );
  var delayGen = require( './delay-generator' )();
  var typicalSteps = require( './typical-server-request' )();

  function log( msg ) {
    console.log( msg );
  }

  function eachStep( stepArray, method, callback ) {
    var myLog = log.bind( undefined, stepArray[0] );
    
    function logAndCallBack() {
      myLog();
      callback();
    }
    // process the fixed-length items as cycle delays
    // simulating computation
    if ( stepArray.length === 2 ) {
      delayGen['cycles']( logAndCallBack, stepArray[1] );
      return;
    }
    // else 
    var delayMS = randomNumberGen( stepArray[2], stepArray[1] )();
    var logMsg = method + ': ' + stepArray[0] + ', delay: ' + delayMS; 

    delayGen[ method ]( 
      logAndCallBack, 
      delayMS
    );
  }

  function loopSteps( typicalSteps ){
    if ( typicalSteps.length > 0 ) {
      eachStep( 
        typicalSteps[0], 
        method, 
        function( typicalSteps ){ 
          typicalSteps.shift();
          loopSteps( typicalSteps );
        }.bind( undefined, typicalSteps )
      );

      return;
    }
    console.log( 'exiting', Date.now() - now );
  }

  loopSteps( typicalSteps );
}
