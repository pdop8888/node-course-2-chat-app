var socket = io();

function scrollToBottom() {
  // Selectors
  const messages = jQuery('#messages');
  const newMessage = messages.children('li:last-child');
  // Heights
  const clientHeight = messages.prop('clientHeight');
  const scrollTop = messages.prop('scrollTop');
  const scrollHeight = messages.prop('scrollHeight');
  const newMessageHeight = newMessage.innerHeight();
  const lastMessageHeight = newMessage.prev().innerHeight();

  if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
    messages.scrollTop(scrollHeight); // moves to bottom
  }
};

socket.on('connect', function() {
  // console.log('yo connect');
  const params = jQuery.deparam(window.location.search);

  socket.emit('join', params, function (err) {
    if (err)
    {
      alert(err); // tell user via box
      window.location.href = '/'; // redirect user
    }
    else
    {
      console.log('chat.js/join() says No error');
    }
  });
});

socket.on('disconnect', function() {
  console.log('yo gone from server');
});

socket.on('updateUserList', function(users) {
  const ol = jQuery('<ol></ol>');
  users.forEach(function (user) {
    ol.append(jQuery('<li></li>').text(user));
  });
  jQuery('#users').html(ol);
});

socket.on('newMessage', function(message) {
  const formattedTime = moment(message.createdAt).format('h:mm a');
  var template = jQuery('#message-template').html();
  var html = Mustache.render(template, {
    text: message.text,
    from: message.from,
    createdAt: formattedTime
  });
  jQuery('#messages').append(html);
  scrollToBottom();
});

socket.on('newLocationMessage', function (message) {
  const formattedTime = moment(message.createdAt).format('h:mm a');
  var template = jQuery('#location-message-template').html();
  var html = Mustache.render(template, {
    from: message.from,
    url: message.url,
    createdAt: formattedTime
  });
 jQuery('#messages').append(html);
 scrollToBottom();
});

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