// ============================================================
// Validation middleware (owner: Kisha-a11y, branch: feature/validation)
// ------------------------------------------------------------
// These functions run BEFORE the controller. They check the data
// sent by the user. If something is wrong, reply with 400 and STOP.
// If everything is fine, call next() to move on to the controller.
//
// Right now they are PLACEHOLDERS that let everything through.
// Replace each one with real checks.
//
// Error reply format (use this exactly so everyone stays consistent):
//   res.status(400).json({
//     success: false,
//     message: 'Validation failed',
//     errors: ['name is required', 'price must be a positive number']
//   });
//
// Example (category):
//   const errors = [];
//   if (!req.body.name || typeof req.body.name !== 'string' || !req.body.name.trim()) {
//     errors.push('name is required');
//   }
//   if (errors.length) return res.status(400).json({ success: false, message: 'Validation failed', errors });
//   next();
//
// Things to check for products:
//   name (required text), price (number >= 0), quantity (whole number >= 0),
//   low_stock_threshold (whole number >= 0, optional), category_id (required whole number)
// For stock change: "change" must be a whole number and not 0.
// ============================================================

// Used by POST + PUT /api/categories
exports.validateCategory = (req, res, next) => {
  next();
};

// Used by POST + PUT /api/products
exports.validateProduct = (req, res, next) => {
  next();
};

// Used by PATCH /api/products/:id/stock
exports.validateStockChange = (req, res, next) => {
  next();
};
