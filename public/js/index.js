var socket = io();

socket.on('connect', function() {
  console.log('yo connect');
});

socket.on('disconnect', function() {
  console.log('yo gone from server');
});

socket.on('newMessage', function(message) {
    const formattedTime = moment(message.createdAt).format('h:mm a');
    var li = jQuery('<li></li>');
    li.text(`${message.from} ${formattedTime}: ${message.text}`);

    jQuery('#messages').append(li);
});

socket.on('newLocationMessage', function (message) {
  const formattedTime = moment(message.createdAt).format('h:mm a');
  var li = jQuery('<li></li>');
  var a = jQuery('<a target="_blank">My current location</a>');

  li.text(`${message.from} ${formattedTime}: `);
  a.attr('href', message.url);
  li.append(a);

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

    var textBox = jQuery('[name=message]');

    socket.emit('createMessage', {
      from: 'User',
      text: textBox.val() // selector
    }, function () {
      textBox.val('');
    });
  });

  var locationButton = jQuery('#send-location');
  // jQuery('#send-location').on
  locationButton.on('click', function () {

    console.log('Button pushed');

    if (!navigator.geolocation) {
      return alert('Geolocation not supported by your browser');
    }

    locationButton.attr('disabled','disabled').text('Sending location...');

    navigator.geolocation.getCurrentPosition(function (position) {
      //console.log(position);
      locationButton.removeAttr('disabled').text('Send locaton');
      socket.emit('createLocationMessage', {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      });
    }, function () {
      locationButton.removeAttr('disabled').text('Send locaton');
      alert('Unable to fetch location');
    });
  });