// ============================================================
// STOCK SERVICE (owner: kellscaleb, branch: feature/stock-logic)
// ------------------------------------------------------------
// The "smart" part of the project. These are the business rules
// graders will look at most closely.
//
// RULES FOR THIS LAYER
//  - Throw new AppError(message, statusCode) when a rule is broken.
//  - Use productRepository only for data (never touch a Map directly).
//  - Never use req / res.
//
// THE STOCK RULES
//  1. Quantity can NEVER go below 0.
//  2. You can't remove more than what is in stock:
//       -> 400  "Not enough stock. Available: 3, requested: 10"
//  3. Low stock means:  quantity <= lowStockThreshold
//       (use the helper:  const { withLowStock, isLowStock } = require('../utils/productHelpers');)
//  4. Unknown product id -> 404
//
// adjustStock(id, change):
//     change is a whole number. Negative = items sold, positive = restock.
//     Update the product through productRepository.update and return it with
//     the "lowStock" field (withLowStock).
// ============================================================
const AppError = require('../utils/AppError');
// const productRepository = require('../repositories/productRepository');
// const { withLowStock, isLowStock } = require('../utils/productHelpers');

const notImplemented = () => {
  throw new AppError('Not implemented yet', 501);
};

// Adds (positive) or removes (negative) stock. Returns the updated product with lowStock.
exports.adjustStock = (id, change) => notImplemented();

// Returns an array of all products that are low on stock (each with lowStock: true)
exports.getLowStockProducts = () => notImplemented();
