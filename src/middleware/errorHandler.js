// ============================================================
// ERROR HANDLING (starter by Logical883)
// Improved by: S580-maker, branch: feature/error-handling
// ------------------------------------------------------------
// notFound      -> runs when no route matches (404)
// errorHandler  -> catches every error thrown anywhere in the app
//                  (services, validation...) and sends ONE clean,
//                  consistent reply instead of crashing.
//
// Standard error reply:   { "success": false, "message": "...", "errors": [...optional...] }
//
// Ideas to improve (your tasks):
//  - Show technical details only when NODE_ENV is not "production"
//  - Handle other known errors (for example payload too large)
//  - Make the 404 message friendlier
//  - Clean, readable error logging
// ============================================================

// 404: the address doesn't exist
exports.notFound = (req, res, next) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
};

// Catches everything else. It MUST have exactly 4 parameters.
exports.errorHandler = (err, req, res, next) => {
  // Bad JSON sent by the client, e.g. a missing quote or comma
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ success: false, message: 'Invalid JSON in request body' });
  }

  // Errors WE throw on purpose with: throw new AppError(message, statusCode)
  if (err.isOperational) {
    const body = { success: false, message: err.message };
    if (err.errors) body.errors = err.errors;
    return res.status(err.statusCode).json(body);
  }

  // Anything else is a bug: log it, but don't leak details to the user
  console.error(err);
  res.status(500).json({ success: false, message: 'Something went wrong on the server' });
};
