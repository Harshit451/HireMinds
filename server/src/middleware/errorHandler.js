/**
 * 404 Not Found Middleware
 */
function notFound(req, res, next) {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
}

/**
 * Centralized Error Handling Middleware
 */
function errorHandler(err, req, res, next) {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);

  const response = {
    status: 'error',
    message: err.message || 'Internal Server Error',
  };

  // Only include stack trace in non-production environments
  if (process.env.NODE_ENV !== 'production') {
    response.stack = err.stack;
  }

  res.json(response);
}

module.exports = {
  notFound,
  errorHandler,
};
