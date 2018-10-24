export default (err, req, res, next) => {
    let { status = 500, message = 'Server error' } = err;

    return res
        .status(status)
        .json({ status,  message })
};
