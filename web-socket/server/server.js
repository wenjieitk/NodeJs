const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

const {port} = require('../config/env');
const publicPath = path.join(__dirname,'../public'); // redirect path to specific folder, instead or go through one by one
let app = express();
let server = http.createServer(app); // use http server
let io = socketIO(server);

// to start up the html page
app.use(express.static(publicPath));

// when server is started
io.on('connection', (socket) => {
    console.log('server connected');

    // when server is disconnected
    socket.on('disconnect', () => {
        console.log('server disconnected');
    });

    /**********  socket event  ************/

    // fire to client
    socket.emit('newEmail',{
        from: 'bal@sdfcom',
        text: 'test'
    });

    // listen from client
    socket.on('createEmail',(newEmail) => {
        console.log(`createEmail ${JSON.stringify(newEmail)}`);
    })

});

/******** Port listening *********/
server.listen(port,() => {
    console.log(`Started up at port ${port}`);
});

module.exports = {
    app
};