const http = require('http');
const app = require('./app');
const { PORT } = require('./config/env');
const playgroundRoutes = require('./routes/playground');
const requestLogger = require('./middleware/requestLogger');
const notFound = require('./middleware/notFound');
const errorHandler = require('./middleware/errorHandler');

const server = http.createServer(app);
app.use(requestLogger);

server.listen(PORT, () => console.log(`API on :${PORT}`));

app.use('/api', playgroundRoutes);

// error handling
app.use(notFound);
app.use(errorHandler);

