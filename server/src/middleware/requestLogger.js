const pinoHttp = require('pino-http');
const logger = require('../config/logger');

module.exports = pinoHttp({
    logger,
    // optional: customize what gets logged
    customLogLevel: function (res, err) {
        if (err || res.statusCode >= 500) return 'error';
        if (res.statusCode >= 400) return 'warn';
        return 'info';
    },
    serializers: {
        req(req) {
            return {
                method: req.method,
                url: req.url,
                // if you need: headers, remoteAddress, etc.
            };
        },
    },
});