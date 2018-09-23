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
    console.log('new user connected');

    socket.on('createMessage', (message) => {
        console.log('createMessage', message);
        socket.broadcast.emit('newMessage', {
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