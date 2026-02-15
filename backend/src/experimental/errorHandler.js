// centralized error handler middleware
// idea: replace individual try-catch blocks with this
class AppError extends Error {
  constructor(message, statusCode, code) {
    super(message);
    this.statusCode = statusCode;
    this.code = code || 'INTERNAL_ERROR';
    this.isOperational = true;
  }
}
const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const response = {
    success: false,
    error: {
      message: err.isOperational ? err.message : 'Something went wrong',
      code: err.code || 'INTERNAL_ERROR',
    }
  };
  if (process.env.NODE_ENV === 'development') {
    response.error.stack = err.stack;
  }
  console.error(`[ERROR] ${statusCode} - ${err.message}`);
  res.status(statusCode).json(response);
};
module.exports = { AppError, errorHandler };
