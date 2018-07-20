let socket = io();

// when client is disconnected
socket.on('disconnect', function() {
    console.log('disconnected');
});

// when client is started
// put emit in socket.on on client side
socket.on('connect' , function(){
    console.log('connected to server');

    // fire to server
    socket.emit('createEmail', {
        to:'who@csd.com',
        text: 'het, this is testing'
    });
});

// listen from server
socket.on('newEmail',  function(email) {
    console.log('new email\n', email);
})