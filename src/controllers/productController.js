const AppError = require('../utils/AppError');
const productService = require('../services/productService');

exports.createProduct = (req, res) => {
  const product = productService.createProduct(req.body);
  res.status(201).json({ success: true, data: product });
};

exports.getProducts = (req, res, next) => {
  const filters = {};

  if (req.query.categoryId !== undefined) {
    const categoryId = Number(req.query.categoryId);
    if (!Number.isInteger(categoryId) || categoryId < 1) {
      return next(new AppError('Validation failed', 400, ['categoryId must be a positive whole number']));
    }
    filters.categoryId = categoryId;
  }

  if (req.query.search !== undefined) {
    filters.search = req.query.search;
  }

  const products = productService.getAllProducts(filters);
  res.status(200).json({ success: true, data: products });
};

exports.getProductById = (req, res) => {
  const product = productService.getProductById(Number(req.params.id));
  res.status(200).json({ success: true, data: product });
};

exports.updateProduct = (req, res) => {
  const product = productService.updateProduct(Number(req.params.id), req.body);
  res.status(200).json({ success: true, data: product });
};

exports.deleteProduct = (req, res) => {
  productService.deleteProduct(Number(req.params.id));
  res.status(200).json({ success: true, message: 'Product deleted' });
};
