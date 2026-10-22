// ============================================================
// PRODUCT SERVICE (owner: anonymous371, branch: feature/products)
// ------------------------------------------------------------
// The service is the "chef": ALL the business rules live here.
//
// RULES FOR THIS LAYER
//  - Decide what is allowed. When a rule is broken: throw new AppError(message, statusCode)
//  - Talk to the data ONLY through repositories (never touch a Map directly).
//  - Never use req / res (that's the controller's job).
//  - Return plain data. The controller turns it into a response.
//
// RULES FOR PRODUCTS
//  - Unknown product id                              -> 404
//  - categoryId must belong to an existing category  -> 400 "Category with id X does not exist"
//    (hint: categoryRepository.findById)
//  - Product name already used by ANOTHER product    -> 409 (ignore upper/lower case)
//  - Every product you return must include the "lowStock" field:
//       const { withLowStock } = require('../utils/productHelpers');
//       return withLowStock(product);
//  - Defaults for create: quantity 0 and lowStockThreshold 10 if not provided
//  - Stock changes (selling/restocking) are NOT done here, that is stockService.js
//
// FILTERS for getAllProducts(filters):
//    filters.categoryId  -> only products in that category
//    filters.search      -> name contains this text (ignore upper/lower case)
// ============================================================
const AppError = require('../utils/AppError');
// const productRepository = require('../repositories/productRepository');
// const categoryRepository = require('../repositories/categoryRepository');
// const { withLowStock } = require('../utils/productHelpers');

const notImplemented = () => {
  throw new AppError('Not implemented yet', 501);
};

// filters: { categoryId?: number, search?: string } -> returns an array of products
exports.getAllProducts = (filters) => notImplemented();

// Returns one product, or throws 404
exports.getProductById = (id) => notImplemented();

// data: { name, description?, price, quantity?, lowStockThreshold?, categoryId } -> returns the created product
exports.createProduct = (data) => notImplemented();

// data: same fields as create -> returns the updated product (404 / 400 / 409 rules apply)
exports.updateProduct = (id, data) => notImplemented();

// Deletes the product (404 if unknown)
exports.deleteProduct = (id) => notImplemented();
