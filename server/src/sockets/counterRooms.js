// in memory room state (resets when server restarts)

const roomCounts = new Map();

const getCount = (room) => {
    if (!roomCounts.has(room)) roomCounts.set(room, 0);
    return roomCounts.get(room);
}

const setCount = (room, val) => {
    roomCounts.set(room, val);
    return val;
}

module.exports = function registerCounterRooms(io) {
    io.on('connection', (socket) => {
        socket.on('room:join', ({ room }) => {
            if (!room || typeof room !== 'string') return;

            for (const r of socket.rooms) {
                if (r !== socket.id) socket.leave(r);
            }

            socket.join(room);

            // send current state to the joiner
            socket.emit('counter:state', { room, count: getCount(room) });

            // let others know
            socket.to(room).emit('room:user_joined', { room, id: socket.id });
        });

        socket.on('counter:set', ({ room, count}) => {
            if (!room || typeof room !== 'string') return;
            if (typeof count !== 'number' || Number.isNaN(count)) return;

            const next = setCount(room, count);

            //broadcase state to everyone in room
            io.to(room).emit('counter:state', { room, count: next });
        });

        socket.on("counter:inc", ({ room, by = 1 }) => {
            if (!room || typeof room !== 'string') return;
            if (typeof by !== 'number' || Number.isNaN(by)) by = 1;

            const next = setCount(room, getCount(room) + by);
            io.to(room).emit('counter:state', { room, count: next });
        });

        socket.on('couner:reset', ({ room }) => {
            if (!room || typeof room !== 'string') return;

            const next = setCount(room, 0);
            io.to(room).emit('counter:state', { room, count: next });
        });
    });
}