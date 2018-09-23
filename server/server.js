const path = require('path');

const http = require('http'); // built in
const express = require('express');
const socketIO = require('socket.io');

const{generateMessage} = require('./utils/message');
const{generateLocationMessage} = require('./utils/message');

var app = express();
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {

    socket.emit('newMessage', generateMessage('Admin','Welcome to the chat'));

    socket.broadcast.emit('newMessage', generateMessage('Admin','New user joined'));

    socket.on('createMessage', (message, callback) => {
        console.log('createMessage', message);
        io.emit('newMessage', generateMessage(message.from,message.text));
        callback('This is a callback from the server');
    });

    // listener
    socket.on('createLocationMessage', (coords) => {
        // just text io.emit('newMessage', generateMessage('Admin', `${coords.latitude}, ${coords.longitude}`));
        // URL is nicer...
        io.emit('newLocationMessage', 
                 generateLocationMessage('Admin',coords.latitude,coords.longitude));
    });

    socket.on('disconnect', () => {
        console.log('user sicoketnect');
    });
});

server.listen(port, ()  => {
    console.log(`Started on port ${port}`);
});

//module.exports = {app};