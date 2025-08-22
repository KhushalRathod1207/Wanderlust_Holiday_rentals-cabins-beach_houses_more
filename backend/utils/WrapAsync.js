// WrapAsync to catch errors in async routes
module.exports = function WrapAsync(fn) {
    return function (req, res, next) {
        fn(req, res, next).catch(next);
    };
};
