module.exports = (err, req, res, next) => {
  const { status, message, errors } = err;
  let validationErrors;
  console.log(JSON.stringify(errors))
  if (errors) {
    validationErrors = {};
    errors.forEach((error) => (validationErrors[error.param || error.path] = error.msg));
  }
  res
    .status(status)
    .send(
      {
        message,
        timestamp: Date.now(),
        path: req.originalUrl,
        validationErrors
      });
}