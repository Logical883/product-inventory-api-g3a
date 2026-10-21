// ============================================================
// Category controller (owner: Akata692, branch: feature/categories)
// ------------------------------------------------------------
// Each function below is a PLACEHOLDER that replies "501 Not Implemented".
// Replace the body of each one with real code.
//
// Reminders:
//  - Use the database:   const db = require('../config/db');
//  - Reply format:       res.status(201).json({ success: true, data: ... })
//  - Not found?          return res.status(404).json({ success: false, message: '...' })
//  - Delete a category that still has products -> 409 Conflict
//  - Duplicate name -> 409 Conflict
// ============================================================
// const db = require('../config/db');

const notImplemented = (res) =>
  res.status(501).json({ success: false, message: 'Not implemented yet' });

// POST /api/categories
exports.createCategory = (req, res) => notImplemented(res);

// GET /api/categories
exports.getCategories = (req, res) => notImplemented(res);

// GET /api/categories/:id
exports.getCategoryById = (req, res) => notImplemented(res);

// PUT /api/categories/:id
exports.updateCategory = (req, res) => notImplemented(res);

// DELETE /api/categories/:id
exports.deleteCategory = (req, res) => notImplemented(res);
