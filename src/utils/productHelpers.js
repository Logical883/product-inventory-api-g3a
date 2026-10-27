const isLowStock = (product) => product.quantity <= product.lowStockThreshold;

const withLowStock = (product) => ({ ...product, lowStock: isLowStock(product) });

module.exports = { isLowStock, withLowStock };
