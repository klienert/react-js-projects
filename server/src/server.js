const http = require('http');
const app = require('./app');
const { PORT } = require('./config/env');
const playgroundRoutes = require('./routes/playground');
const requestLogger = require('./middleware/requestLogger');
const notFound = require('./middleware/notFound');
const errorHandler = require('./middleware/errorHandler');
const { initSockets } = require('./sockets');


const server = http.createServer(app);

// sockets
initSockets(server);

server.listen(PORT, () => console.log(`API on :${PORT}`));