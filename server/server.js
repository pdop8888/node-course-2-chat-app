const path = require('path');

const http = require('http'); // built in
const express = require('express');
const socketIO = require('socket.io');

var app = express();
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {

    socket.emit('newMessage', {
        from: 'Admin',
        text: 'Welcome to the chat',
        createdAt: new Date().getTime()
    });

    socket.broadcast.emit('newMessage', {
        from: 'Admin',
        text: 'New user joined.',
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

    socket.on('disconnect', () => {
        console.log('user sicoketnect');
    });
});

server.listen(port, ()  => {
    console.log(`Started on port ${port}`);
});

//module.exports = {app};