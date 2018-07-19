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

//socket function
io.on('connection', (socket) => {
    console.log('server connected');
    
    socket.on('disconnect', () => {
        console.log('server disconnected');
        
    });
});

/******** Port listening *********/
server.listen(port,() => {
    console.log(`Started up at port ${port}`);
});

module.exports = {
    app
};