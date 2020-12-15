exports.createResponse = function (
  res,
  status,
  statusCode,
  statusMessage,
  data
) {
  res.status(status);
  res.json({
    status: status,
    message: statusMessage,
    statusCode: statusCode,
    payload: data,
  });
};

exports.getErrorMessage = function (field, res) {
  res.status(400);
  res.json({
    status: 400,
    message: field + ' field is missing or Invalid in the request',
    statusCode: 10010,
  });
};
