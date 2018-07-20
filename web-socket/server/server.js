/**
 * socket.emit = emits an event to single connection
 * socket.on = listen from client
 * io.emit = emits an envent to EVERY single connection
 * io.on = the socket connection is start
 * socket.broadcast.emit = send to all the connection but me
 */

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
    console.log('New user connected');
  
    socket.emit('newMessage', {
      from: 'Admin',
      text: 'Welcome to the chat app',
      createdAt: new Date().getTime()
    });
  
    socket.broadcast.emit('newMessage', {
      from: 'Admin',
      text: 'New user joined',
      createdAt: new Date().getTime()
    });
  
    socket.on('createMessage', (message) => {
      console.log('createMessage', message);
      io.emit('newMessage', {
        from: message.from,
        text: message.text,
        createdAt: new Date().getTime()
      });
    });

    socket.on('userLogin', (user) => {
        io.emit('newMessage', {
            status: 'Login success',
            name: user.userName,
            time: new Date().getTime()
        });
      }); 
  
    socket.on('disconnect', () => {
      console.log('User was disconnected');
    });
  });

/******** Port listening *********/
server.listen(port,() => {
    console.log(`Started up at port ${port}`);
});

module.exports = {
    app
};