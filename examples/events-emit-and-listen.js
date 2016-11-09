var EventClass = require( 'events' );
var eventer = new EventClass();
var myRadio = {
  radioStation: {
    playlist: [],
    startUp: function() {
      if ( !eventer.emit( 'start' )) {
        return 'start failed - no listener';
      }
    }
  }
};

eventer.on( 'start', function() {
  console.log( 'started' );
  eventer.emit( 'getPlaylist' );
});
eventer.once( 'getPlaylist', function() {
  myRadio.radioStation.playlist.push( 'Naima', 'Spiritual', 'Harborview Hospital' );
});
eventer.on( 'error', function ( msg1, msg2 ) { 
  console.log('ERROR - ' + msg1 + ' ' + msg2 ); 
});
module.exports = myRadio;
