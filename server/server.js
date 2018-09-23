const path = require('path');

const http = require('http'); // built in
const express = require('express');
const socketIO = require('socket.io');

const{generateMessage} = require('./utils/message');

var app = express();
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {

    socket.emit('newMessage', generateMessage('Admin','Welcome to the chat'));

    socket.broadcast.emit('newMessage', generateMessage('Admin','New user joined'));

    socket.on('createMessage', (message) => {
        console.log('createMessage', message);
        io.emit('newMessage', generateMessage(message.from,message.text));
    });

    socket.on('disconnect', () => {
        console.log('user sicoketnect');
    });
});

server.listen(port, ()  => {
    console.log(`Started on port ${port}`);
});

//module.exports = {app};