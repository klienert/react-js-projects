// Express app setup (middleware, routes, etc);
const express = require('express');
const cors = require('cors');
const { corsOptions } = require('./config/cors');
const routes = require('./routes');
const requestLogger = require('./middleware/requestLogger');
const notFound = require('./middleware/notFound');
const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(express.json({ limit: '50mb'}));
app.use(cors(corsOptions));
app.use(requestLogger);

app.use('/api', routes);

// error handling - stay last in order
app.use(notFound);
app.use(errorHandler);

module.exports = app;