// ============================================================
// Error handling (starter version by Logical883)
// Improved by: S580-maker, branch: feature/error-handling
// ------------------------------------------------------------
// notFound      -> runs when no route matches (404)
// errorHandler  -> catches any error thrown in the app and sends
//                  a clean, consistent reply instead of a crash.
//
// Standard reply format for ALL errors:
//   { "success": false, "message": "..." }
//
// Ideas to improve:
//  - Turn SQLite errors into friendly messages (unique name -> 409, etc.)
//  - Hide technical details in production
//  - Log errors in a readable way
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

  // SQLite: duplicate value in a UNIQUE column
  if (err.code === 'SQLITE_CONSTRAINT_UNIQUE') {
    return res.status(409).json({ success: false, message: 'That name already exists' });
  }

  // SQLite: linked record problem (e.g. category does not exist)
  if (err.code === 'SQLITE_CONSTRAINT_FOREIGNKEY') {
    return res.status(409).json({ success: false, message: 'Related record problem (check category_id)' });
  }

  // SQLite: a CHECK rule was broken (e.g. negative price or quantity)
  if (err.code === 'SQLITE_CONSTRAINT_CHECK') {
    return res.status(400).json({ success: false, message: 'A value broke a database rule (e.g. negative number)' });
  }

  console.error(err);
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.statusCode ? err.message : 'Something went wrong on the server',
  });
};
