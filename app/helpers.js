exports.createResponse = function (res, status, statusCode, statusMessage, data) {
    res.status(status);
    res.json({
        status: status,
        message: statusMessage,
        statusCode: statusCode,
        payload: data
    });
}