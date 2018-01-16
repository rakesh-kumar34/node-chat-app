var socket = io();


socket.on('connect', function () {
    console.log('Connected to server');
});

socket.on('newMessage', function (msg) {
    console.log('newMessage:', msg);
    var li = $('<li></li>');
    li.text(`${msg.from}: ${msg.text}`);
    $('#messages').append(li);
});

socket.on('newLocationMessage', function(locationMsg) {
    var li = $('<li></li>');
    var a = $('<a target="_blank">My current location</a>');
    li.text(`${locationMsg.from}`);
    a.attr('href', locationMsg.url);
    li.append(a);
    $('#messages').append(li);
});

$('#chat-form').on('submit', (e) => {
    e.preventDefault();

    socket.emit('createMessage', {
        from: 'User',
        text: $('#message').val()
    }, (ack) => {
        console.log('ack');
    });
});

var locationButton = $('#send-location');

locationButton.on('click', () => {
    if(!navigator.geolocation) {
        return alert('Geolocation not supported by browser');
    }
    navigator.geolocation.getCurrentPosition((position) => {
        console.log(position);
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, (err) => {
      alert('Unable to fetch location');
    });
});