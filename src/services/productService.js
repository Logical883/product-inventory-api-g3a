const AppError = require('../utils/AppError');
const productRepository = require('../repositories/productRepository');
const categoryRepository = require('../repositories/categoryRepository');
const { withLowStock } = require('../utils/productHelpers');

const ensureCategoryExists = (categoryId) => {
  if (!categoryRepository.findById(categoryId)) {
    throw new AppError(`Category with id ${categoryId} does not exist`, 400);
  }
};

const ensureUniqueName = (name, ignoreId) => {
  const existing = productRepository.findByName(name);
  if (existing && existing.id !== ignoreId) {
    throw new AppError(`Product name "${name}" already exists`, 409);
  }
};

exports.getAllProducts = (filters = {}) => {
  let products = productRepository.findAll();

  if (filters.categoryId !== undefined) {
    products = products.filter((product) => product.categoryId === filters.categoryId);
  }

  if (filters.search) {
    const term = String(filters.search).toLowerCase();
    products = products.filter((product) => product.name.toLowerCase().includes(term));
  }

  return products.map(withLowStock);
};

exports.getProductById = (id) => {
  const product = productRepository.findById(id);
  if (!product) throw new AppError(`Product with id ${id} not found`, 404);
  return withLowStock(product);
};

exports.createProduct = (data) => {
  ensureCategoryExists(data.categoryId);
  ensureUniqueName(data.name);

  const product = productRepository.create({
    name: data.name,
    description: data.description ?? '',
    price: data.price,
    quantity: data.quantity ?? 0,
    lowStockThreshold: data.lowStockThreshold ?? 10,
    categoryId: data.categoryId,
  });

  return withLowStock(product);
};

exports.updateProduct = (id, data) => {
  const product = productRepository.findById(id);
  if (!product) throw new AppError(`Product with id ${id} not found`, 404);

  ensureCategoryExists(data.categoryId);
  ensureUniqueName(data.name, id);

  const updated = productRepository.update(id, {
    name: data.name,
    description: data.description ?? product.description,
    price: data.price,
    quantity: data.quantity ?? product.quantity,
    lowStockThreshold: data.lowStockThreshold ?? product.lowStockThreshold,
    categoryId: data.categoryId,
  });

  return withLowStock(updated);
};

exports.deleteProduct = (id) => {
  const product = productRepository.findById(id);
  if (!product) throw new AppError(`Product with id ${id} not found`, 404);
  productRepository.remove(id);
};
