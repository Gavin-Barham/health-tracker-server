module.exports = function handleErrors (err, req, res, next) {
    console.log(err);
    const status = err.statusCode || 500;
    const message = err.message;
    res.status(status).json({ message: message });
}
