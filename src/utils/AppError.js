// ============================================================
// AppError: a custom error with an HTTP status code (owner: Logical883)
// ------------------------------------------------------------
// Services THROW this when a rule is broken. The error handler
// (middleware/errorHandler.js) catches it and sends a clean reply.
//
//   throw new AppError('Product with id 9 not found', 404);
//   throw new AppError('Not enough stock. Available: 3, requested: 10', 400);
//   throw new AppError('Validation failed', 400, ['name is required']);
//
// Status codes we use: 400 bad data / broken stock rule, 404 not found,
// 409 conflict (duplicate name, category still has products).
// ============================================================
class AppError extends Error {
  constructor(message, statusCode = 500, errors = undefined) {
    super(message);
    this.statusCode = statusCode;
    if (errors) this.errors = errors; // optional list of detailed messages
    this.isOperational = true;        // "expected" error, not a bug
  }
}

module.exports = AppError;
