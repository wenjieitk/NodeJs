var socket = io();

socket.on('connect', function () {
    console.log('Connected to server');

    // emit to server when client is connected
    socket.emit('userLogin', {
        userName: 'jie'
    });
});

socket.on('disconnect', function () {
  console.log('Disconnected from server');
});

socket.on('newMessage', function (message) {
  console.log('newMessage', message);
});
