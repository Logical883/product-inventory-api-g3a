// ============================================================
// Product controller: UPDATE + DELETE
// (owner: Damian-404, branch: feature/products-update-delete)
// ------------------------------------------------------------
// Each function below is a PLACEHOLDER that replies "501 Not Implemented".
// Replace the body of each one with real code.
//
// Reminders:
//  - Use the database:   const db = require('../config/db');
//  - Unknown id -> 404
//  - On update, refresh the updated_at column:  updated_at = datetime('now')
//  - Changing category_id? The new category must exist.
//  - Duplicate name -> 409 Conflict
// ============================================================
// const db = require('../config/db');

const notImplemented = (res) =>
  res.status(501).json({ success: false, message: 'Not implemented yet' });

// PUT /api/products/:id
exports.updateProduct = (req, res) => notImplemented(res);

// DELETE /api/products/:id
exports.deleteProduct = (req, res) => notImplemented(res);
