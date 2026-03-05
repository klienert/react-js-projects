// Express app setup (middleware, routes, etc);
const express = require('express');
const cors = require('cors');
const { corsOptions } = require('./config/cors');
const routes = require('./routes');

const app = express();

app.use(express.json({ limit: '50mb'}));
app.use(cors(corsOptions));

app.use('/api', routes);

module.exports = app;