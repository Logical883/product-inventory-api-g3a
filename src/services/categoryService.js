const AppError = require('../utils/AppError');
const categoryRepository = require('../repositories/categoryRepository');
const productRepository = require('../repositories/productRepository');

exports.getAllCategories = () => categoryRepository.findAll();

exports.getCategoryById = (id) => {
  const category = categoryRepository.findById(id);
  if (!category) throw new AppError(`Category with id ${id} not found`, 404);
  return category;
};

exports.createCategory = (data) => {
  if (categoryRepository.findByName(data.name)) {
    throw new AppError(`Category name "${data.name}" already exists`, 409);
  }
  return categoryRepository.create({ name: data.name });
};

exports.updateCategory = (id, data) => {
  const category = categoryRepository.findById(id);
  if (!category) throw new AppError(`Category with id ${id} not found`, 404);

  const existing = categoryRepository.findByName(data.name);
  if (existing && existing.id !== id) {
    throw new AppError(`Category name "${data.name}" already exists`, 409);
  }

  return categoryRepository.update(id, { name: data.name });
};

exports.deleteCategory = (id) => {
  const category = categoryRepository.findById(id);
  if (!category) throw new AppError(`Category with id ${id} not found`, 404);

  const products = productRepository.findByCategoryId(id);
  if (products.length > 0) {
    throw new AppError(
      `Cannot delete category: it still has ${products.length} product(s)`,
      409
    );
  }

  categoryRepository.remove(id);
};
