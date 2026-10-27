const categoryService = require('../services/categoryService');

exports.createCategory = (req, res) => {
  const category = categoryService.createCategory(req.body);
  res.status(201).json({ success: true, data: category });
};

exports.getCategories = (req, res) => {
  const categories = categoryService.getAllCategories();
  res.status(200).json({ success: true, data: categories });
};

exports.getCategoryById = (req, res) => {
  const category = categoryService.getCategoryById(Number(req.params.id));
  res.status(200).json({ success: true, data: category });
};

exports.updateCategory = (req, res) => {
  const category = categoryService.updateCategory(Number(req.params.id), req.body);
  res.status(200).json({ success: true, data: category });
};

exports.deleteCategory = (req, res) => {
  categoryService.deleteCategory(Number(req.params.id));
  res.status(200).json({ success: true, message: 'Category deleted' });
};
