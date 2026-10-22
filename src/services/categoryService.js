// ============================================================
// CATEGORY SERVICE (owner: Damian-404, branch: feature/categories)
// ------------------------------------------------------------
// The service is the "chef": ALL the business rules live here.
//
// RULES FOR THIS LAYER
//  - Decide what is allowed. When a rule is broken: throw new AppError(message, statusCode)
//  - Talk to the data ONLY through repositories (never touch a Map directly).
//  - Never use req / res (that's the controller's job).
//  - Return plain data. The controller turns it into a response.
//
// RULES FOR CATEGORIES
//  - Unknown id                                  -> 404
//  - Creating/renaming to a name that exists     -> 409 (ignore upper/lower case)
//  - Deleting a category that still has products -> 409
//    (hint: productRepository.findByCategoryId(id) tells you)
//
// EXAMPLE OF THE PATTERN:
//   exports.getCategoryById = (id) => {
//     const category = categoryRepository.findById(id);
//     if (!category) throw new AppError(`Category with id ${id} not found`, 404);
//     return category;
//   };
// ============================================================
const AppError = require('../utils/AppError');
// const categoryRepository = require('../repositories/categoryRepository');
// const productRepository = require('../repositories/productRepository');

const notImplemented = () => {
  throw new AppError('Not implemented yet', 501);
};

// Returns an array of all categories
exports.getAllCategories = () => notImplemented();

// Returns one category, or throws 404
exports.getCategoryById = (id) => notImplemented();

// data: { name }  -> returns the created category (throws 409 on duplicate name)
exports.createCategory = (data) => notImplemented();

// data: { name }  -> returns the updated category (404 / 409 rules apply)
exports.updateCategory = (id, data) => notImplemented();

// Deletes the category (404 if unknown, 409 if it still has products). Returns nothing important.
exports.deleteCategory = (id) => notImplemented();
