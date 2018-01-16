const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

var app = express();

var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New User Connected !');

    socket.on('createMessage', (msg) => {
        console.log(`Message recieved on server is: ${JSON.stringify(msg)}`);
    });

    socket.emit('newMessage', {
        from: 'John',
        text: 'Hey man !',
        createdAt: 123
    });
});

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
