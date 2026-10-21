// ============================================================
// Product controller: CREATE + READ
// (owner: anonymous371, branch: feature/products-create-read)
// ------------------------------------------------------------
// Each function below is a PLACEHOLDER that replies "501 Not Implemented".
// Replace the body of each one with real code.
//
// Reminders:
//  - Use the database:   const db = require('../config/db');
//  - Create -> 201 Created. Category must exist (else 400 or 404).
//  - Duplicate product name -> 409 Conflict
//  - GET /api/products supports filters:  ?category_id=1  and  ?search=water
//  - Include a "low_stock" true/false field in what you return
//    (low stock = quantity <= low_stock_threshold)
//  - Unknown id -> 404
// ============================================================
// const db = require('../config/db');

const notImplemented = (res) =>
  res.status(501).json({ success: false, message: 'Not implemented yet' });

// POST /api/products
exports.createProduct = (req, res) => notImplemented(res);

// GET /api/products
exports.getProducts = (req, res) => notImplemented(res);

// GET /api/products/:id
exports.getProductById = (req, res) => notImplemented(res);
