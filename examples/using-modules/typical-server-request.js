module.exports = function() {
  return [
    [ 'Set up new connection', 50 ],
    [ 'Send query to dB', 20 ],
    [ 'Wait for query results', 125, 1500 ],
    [ 'Process query results', 50 ],
    [ 'Business logic', 20, 300 ],
    [ 'Call a web service', 35 ],
    [ 'Wait for web service response', 200, 3500 ],
    [ 'Process results', 20 ],
    [ 'Send to network', 20 ],
  ];
};
