var EventClass = require( 'events' );
var eventer = new EventClass();
var myRadio = {
  radioStation: {
    playlist: [],
    startUp: function() {
      if ( !myRadio.eventer.emit( 'start' )) {
        myRadio.eventer.emit( 'getPlaylist' );
      }
    }
  }
};

myRadio.eventer.on( 'start', function() {
  console.log( 'started' );
  if ( !myRadio.eventer.emit( 'getPlaylist' )) {
    myRadio.eventer.once( 'getPlaylist', function() {
      myRadio.radioStation.playlist.push( 'Naima', 'Spiritual', 'Harborview Hospital' );
    });
    return false;
  }
});

module.exports = myRadio;
