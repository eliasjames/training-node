module.exports = function() {
  var ctr = 0;
  function incrementCounter() {
    ctr++;
  }
  
  return {
    getCounter: function() {
      return ctr;
    },
    countOne: incrementCounter
  };
};
