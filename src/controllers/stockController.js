// ============================================================
// Stock logic controller
// (owner: kellscaleb, branch: feature/stock-logic)
// ------------------------------------------------------------
// Each function below is a PLACEHOLDER that replies "501 Not Implemented".
// Replace the body of each one with real code.
//
// The business rules (these matter most to graders!):
//  1. Quantity can NEVER go below 0.
//  2. You can't remove more than what's in stock
//     -> 400 "Not enough stock. Available: X, requested: Y"
//  3. Low stock = quantity <= low_stock_threshold
//  4. Unknown product id -> 404
//
// PATCH /api/products/:id/stock   body: { "change": -3 }   (negative = sold, positive = restock)
// GET   /api/products/low-stock   returns all products that are low on stock
// ============================================================
// const db = require('../config/db');

const notImplemented = (res) =>
  res.status(501).json({ success: false, message: 'Not implemented yet' });

// PATCH /api/products/:id/stock
exports.adjustStock = (req, res) => notImplemented(res);

// GET /api/products/low-stock
exports.getLowStockProducts = (req, res) => notImplemented(res);
