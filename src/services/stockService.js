const AppError = require('../utils/AppError');
const productRepository = require('../repositories/productRepository');
const { isLowStock, withLowStock } = require('../utils/productHelpers');

exports.adjustStock = (id, change) => {
  const product = productRepository.findById(id);
  if (!product) throw new AppError(`Product with id ${id} not found`, 404);

  const nextQuantity = product.quantity + change;
  if (nextQuantity < 0) {
    throw new AppError(
      `Not enough stock. Available: ${product.quantity}, requested: ${Math.abs(change)}`,
      400
    );
  }

  const updated = productRepository.update(id, { quantity: nextQuantity });
  return withLowStock(updated);
};

exports.getLowStockProducts = () =>
  productRepository.findAll().filter(isLowStock).map(withLowStock);
