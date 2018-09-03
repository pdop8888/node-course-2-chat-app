var socket = io();

socket.on('connect', function() {
  console.log('yo connect');
});

socket.on('disconnect', function() {
  console.log('yo gone from server');
});

socket.on('newMessage', function(message) {
    console.log('newMessage', message);
});