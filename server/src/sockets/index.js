const { Server } = require('socket.io');
const { CLIENT_URL } = require('../config/env');

let io; // module-level 

const initSockets = (httpServer) => {
    io = new Server(httpServer, {
        cors: { origin: CLIENT_URL, credentials: true }
    });    

    io.on('connection', (socket) => {
        console.log(`Socket connected: ${socket.id}`);

        // Client tells us who they are after connecting
        // e.g.  socket.emit('user:join', { userId: 42 })
        socket.on('user:join', ({ userId }) => {
            // Join a private room named after the user
            socket.join(`user:${userId}`);
            console.log(`User ${userId} joined their room`);
        });

        // Admin joining a special room to send broadcasts
        socket.on('admin:join', ({ adminId }) => {
            socket.join('admins');
            console.log(`Admin ${adminId} joined admin room`);
        });

        socket.on('disconnect', () => {
            console.log(`Socket disconnected: ${socket.id}`);
        });
    });

    return io;
}

// helper fns

const notifyUser = (userId, notification) => {
    io.to(`user:${userId}`).emit('notification:new', notification);
}

const notifyAll = (notification) => {
    io.emit('notification:new', notification);
}

// module.exports = initSockets;
module.exports = { initSockets, notifyAll, notifyUser }