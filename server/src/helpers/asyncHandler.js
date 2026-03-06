// wrap async route handlers so thrown/rejected errors to go error middleware
module.exports = function asyncHandler(fn) {
    return function wrapped(req, res, next) {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
}