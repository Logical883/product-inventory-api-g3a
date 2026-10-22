// ============================================================
// VALIDATION MIDDLEWARE (owner: Kisha-a11y, branch: feature/validation)
// ------------------------------------------------------------
// These functions run BEFORE the controller. They check the data the
// user sent. If something is wrong: reply 400 and STOP.
// If everything is fine: call next() to move on.
//
// Right now they are PLACEHOLDERS that let everything through.
// Replace each one with real checks.
//
// Use AppError so the error handler formats the reply for you:
//   const AppError = require('../utils/AppError');
//   if (errors.length) return next(new AppError('Validation failed', 400, errors));
//   next();
//
// The reply will look like:
//   { "success": false, "message": "Validation failed", "errors": ["name is required"] }
//
// Collect ALL the problems in the errors array (don't stop at the first one).
// Remember: numbers sent as text ("5") should be rejected, and so should
// NaN, negative values, decimals where whole numbers are needed, and empty/blank text.
// ============================================================

// For every address that has :id.  The id must be a whole number >= 1.
// Bad example: /api/products/abc  -> 400 "id must be a positive whole number"
exports.validateId = (req, res, next) => {
  next();
};

// POST + PUT /api/categories
// name: required text, not blank (trim it), max 50 characters
exports.validateCategory = (req, res, next) => {
  next();
};

// POST + PUT /api/products
//   name               required text, not blank
//   description        optional text
//   price              required number >= 0
//   quantity           optional whole number >= 0
//   lowStockThreshold  optional whole number >= 0
//   categoryId         required whole number >= 1
exports.validateProduct = (req, res, next) => {
  next();
};

// PATCH /api/products/:id/stock
//   change   required whole number, and not 0  (negative = sold, positive = restock)
exports.validateStockChange = (req, res, next) => {
  next();
};
