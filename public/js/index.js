var socket = io();


socket.on('connect', function () {
    console.log('Connected to server');

    socket.emit('createMessage', {
        from: 'Rakesh',
        text: 'Hello !!'
    });
});

socket.on('newMessage', function(msg) {
    console.log('newMessage:', msg);
});