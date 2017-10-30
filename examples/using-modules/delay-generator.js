module.exports = function() {

  function useTimeout( callback, delayMS  ) {
    // simple version
    setTimeout( callback, delayMS );
    // this version binds delayMS to first argument of external function
    // use it if you need to reference delayMS externally
    //setTimeout( callback.bind( callback, delayMS ), delayMS );
  }
  function useCycles( callback, delayMS ) {
    var until = Date.now() + delayMS;
    while ( until > Date.now() ) {
      // stall, do nothing
    }
    return callback();
  }

  return {
    timeouts: useTimeout,
    cycles: useCycles,
  };
};
