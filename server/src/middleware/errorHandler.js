module.exports = (err, req, res, next) => {
    const status = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;

    const isProd = (process.env.NODE_ENV || 'development') === 'production';

    // log the error 
    if (req?.log) {
        req.log.error({ err, status }, 'Request error');
    } else {
        console.error(err);
    }

    res.status(status).json({
        ok: false,
        error: err.message || "Server error",
        ...(isProd ? {} : { stack: err.stack }),
    });
};