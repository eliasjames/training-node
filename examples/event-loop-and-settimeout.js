module.exports = function() {
  function fauxAsyncOperation ( callback ) {
    // Say some operation takes 95ms to complete
    // Could be Ajax, dB, filesystem
    // We'll replace the async operation with 95ms of delicious Folger's Crystals
    setTimeout( callback, 95 );
  }
  function measureDelay( label, previousMark ) {
    var delay = Date.now() - previousMark;
    console.log( label,  'delay: ' + delay + 'ms');
  }

  var markTimeoutSet = Date.now();
  setTimeout( 
    function() { 
      measureDelay( 'Timeout, set before async call, 100ms', markTimeoutSet ); 
    }, 100 
  );
  // call the faux-operation, passing a callback with a delay
  fauxAsyncOperation( 
    function () {
      var startCallback = Date.now();
      // stall 10ms within the callback...
      while ( Date.now() - startCallback < 10 ) {
        ; 
      }
      measureDelay( 'Inside callback passed to async, measuring 10ms stall', startCallback );

//    setTimeout( function() {
//      measureDelay( 'Inside callback passed to async, measuring 10ms stall', startCallback );
//    }, 10 );
    }
  );

}
