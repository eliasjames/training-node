function logIt( message ) { // allocated somewhere on heap
  console.log( message );
}

logIt( 'Whole file on queue, immediately moves to stack' );
setTimeout( function() { // anonymous function allocated on heap
  logIt( 'setTimeout adds onto queue, not stack' );
}, 0 );
// note the 0ms delay

function first( firstArg) {
  logIt( 'first executing on stack' );
  second( firstArg );
  logIt( 'first removed from stack' );
}
function second( secondArg) {
  logIt( 'second executing on stack' );
  logIt( 'passed value is ' + secondArg );
  logIt( 'second removed from stack' );
}

logIt( 'do some work' );
first( 'work' );
logIt( 'done with work' );
