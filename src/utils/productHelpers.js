// ============================================================
// Small helpers shared by the services (owner: Logical883)
// ------------------------------------------------------------
// Low stock rule:  quantity <= lowStockThreshold
//
//   const { withLowStock } = require('../utils/productHelpers');
//   return withLowStock(product);   // adds  lowStock: true/false
// ============================================================

// true when the product is at or below its warning level
const isLowStock = (product) => product.quantity <= product.lowStockThreshold;

// returns a COPY of the product with an extra "lowStock" field
const withLowStock = (product) => ({ ...product, lowStock: isLowStock(product) });

module.exports = { isLowStock, withLowStock };
