const { Server } = require('socket.io');
const { CLIENT_URL } = require('../config/env');
const registerCounterRooms = require('./counterRooms');

const initSockets = (httpServer) => {
    const io = new Server(httpServer, {
        cors: {
            origin: CLIENT_URL,
            credentials: true,
        }
    });

    io.on('connection', (socket) => {
        socket.emit('server:hello', { message: 'Connected to Socket.IO server'});

        // socket.on('client:ping', (payload) => {
        //     socket.emit('server:pong', { ...payload, at: Date.now() });
        // });

        // socket.on('disconnect', () => {
        //     // optional: log disconnects
        // })
    });

    // register features/modules
    registerCounterRooms(io);

    return io;
}

module.exports = initSockets;