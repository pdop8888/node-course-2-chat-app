var socket = io();

socket.on('connect', function() {
  console.log('yo connect');
});

socket.on('disconnect', function() {
  console.log('yo gone from server');
});

socket.on('newMessage', function(message) {
    console.log('newMessage', message);
    var li = jQuery('<li></li>');
    li.text(`${message.from} ${message.text}`);

    jQuery('#messages').append(li);
});

// socket.emit('createMessage', 
//     {
//       from: 'Frank',
//       text: 'Hi'    
//     },
//     // generateMessage('User','screw your chat'),
//     function (data) {
//       console.log('Got it', data);
//     }
//   );

  jQuery('#message-form').on('submit', function (e) {
    e.preventDefault(); // no refresh

    socket.emit('createMessage', {
      from: 'User',
      text: jQuery('[name=message]').val() // selector
    }, function () {

    });
  });