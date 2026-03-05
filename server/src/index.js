const http = require('http');
const app = require('./app');
const { PORT } = require('./config/env');
const playgroundRoutes = require('./routes/playground');

const server = http.createServer(app);

server.listen(PORT, () => console.log(`API on :${PORT}`));

app.use('/api', playgroundRoutes);