class AppError extends Error {
  constructor(message, statusCode = 500, errors = undefined) {
    super(message);
    this.statusCode = statusCode;
    if (errors) this.errors = errors;
    this.isOperational = true;
  }
}

module.exports = AppError;
