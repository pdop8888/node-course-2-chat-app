const path = require('path');

const http = require('http'); // built in
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage} = require('./utils/message');
const {generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

var app = express();
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

app.use(express.static(publicPath));

io.on('connection', (socket) => {

    socket.on('join', (params, callback) => {
        console.log('join', params);
        // validate
        if (!isRealString(params.name) || !isRealString(params.room))
        {
            return callback('Name and room name are required.'); // 1st arg is error message
        }

        const name = params.name;
        const room = params.room;
        const id = socket.id;
        socket.join(room);
        users.removeUser(id);
        users.addUser(id, name, room);

        io.to(room).emit('updateUserList', users.getUserList(room));

        // io.emit - to every single connected user
        //      --> io.to(room).emit
        // socket.broadcast.emit - everybody on socket server but the guy connected
        //      --> socket.broadcast.to(room)
        // socket.emit - specifically to one user
        //      --> no reason to change

        // io.emit('newMessage', generateMessage(message.from,message.text));

        socket.emit('newMessage', generateMessage('Admin','Welcome to the chat'));

        socket.broadcast.to(room).emit('newMessage', generateMessage('Admin',`${name} has joined`));
    
        callback();
    });

    socket.on('createMessage', (message, callback) => {
        const user = users.getUser(socket.id);
        if (user && isRealString(message.text)) {
            io.to(user.room).emit('newMessage', generateMessage(user.name,message.text));
        }
        callback();
    });

    // listener
    socket.on('createLocationMessage', (coords) => {
        const user = users.getUser(socket.id);
        if (user) {
            io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name,coords.latitude,coords.longitude));
        }
    });

    socket.on('disconnect', () => {
        console.log('user dis');
        const user = users.removeUser(socket.id);
        if (user) {
            const room = user.room;
            io.to(room).emit('updateUserList', users.getUserList(room));
            io.to(room).emit('newMessage', generateMessage('Admin',`${user.name} has left`));
        }
    });
});

server.listen(port, ()  => {
    console.log(`Started on port ${port}`);
});

//module.exports = {app};