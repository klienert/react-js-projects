const http = require('http');
const app = require('./app');
const { PORT } = require('./config/env');
const { sequelize } = require('./models');
const playgroundRoutes = require('./routes/playground');
const requestLogger = require('./middleware/requestLogger');
const notFound = require('./middleware/notFound');
const errorHandler = require('./middleware/errorHandler');
const { initSockets } = require('./sockets');

const server = http.createServer(app);

// sockets
initSockets(server);

const start = async () => {
    try {
        await sequelize.authenticate();
        console.log("✓ Connected to MySQL");

        await sequelize.sync();
        console.log("✓ DB tables synced")

        server.listen(PORT, () => {
            console.log(`API Listening on :${PORT}`);
        });

    } catch (err) {
        console.error('Unable to connect to MySQL');
        console.error(err);
        process.exit(1);
        
    }
}
start();
// server.listen(PORT, () => console.log(`API on :${PORT}`));