module.exports = (req, res, next) => {
    res.status(400);
    next(new Error(`Not found: ${req.method} ${req.originalUrl}`));
};