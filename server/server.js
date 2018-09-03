const path = require('path');

const publicPath = path.join(__dirname, '../public');
const http = require('http'); // built in
const express = require('express');
const socketIO = require('socket.io');

var app = express();
const port = process.env.PORT || 3000;
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('new user connected');

    socket.emit('newMessage', {
        from: 'mike',
        text: 'hey sup',
        createdAt: 123
    });

    socket.on('createMessage', (message) => {
        console.log('createMessage', message);
    });

    socket.on('disconnect', () => {
        console.log('user sicoketnect');
    });
});

server.listen(port, ()  => {
    console.log(`Started on port ${port}`);
});

//module.exports = {app};