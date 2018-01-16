const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const {generateMessage} = require('./utils/message');
const {generateLocationMessage} = require('./utils/message');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

var app = express();

var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New User Connected !');

    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the Chat'));

    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New User Joined') );

    socket.on('createMessage', (msg, callback) => {
        //console.log(`Message recieved on server is: ${JSON.stringify(msg)}`);
        io.emit('newMessage', generateMessage(msg.from, msg.text));
        callback('This is an ack from the server');
    });

    socket.on('createLocationMessage', (location) => {
        io.emit('newLocationMessage', generateLocationMessage('Admin', location.latitude, location.longitude));
    });
});

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
