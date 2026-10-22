// ============================================================
// PRODUCT CONTROLLER (owner: anonymous371, branch: feature/products)
// ------------------------------------------------------------
// The controller is the "waiter": it takes the request, hands it to the
// service, and brings back the response.
//
// RULES FOR THIS LAYER
//  - Read from req (req.params, req.body, req.query), call ONE service function, send res.
//  - NO business rules here and NEVER touch repositories.
//  - You don't need try/catch: if the service throws an AppError, Express sends it
//    to the error handler automatically.
//  - The :id in the address arrives as TEXT, so convert it: Number(req.params.id)
//  - Filters come from the query string:  GET /api/products?categoryId=1&search=water
//    (req.query.categoryId is text too, so convert it when it exists)
//
// EXAMPLE OF THE PATTERN:
//   exports.getProductById = (req, res) => {
//     const product = productService.getProductById(Number(req.params.id));
//     res.status(200).json({ success: true, data: product });
//   };
//
// Reply format:  { success: true, data: ... }     (use 201 for create)
// ============================================================
// const productService = require('../services/productService');

const notImplemented = (res) =>
  res.status(501).json({ success: false, message: 'Not implemented yet' });

// POST /api/products      -> 201
exports.createProduct = (req, res) => notImplemented(res);

// GET /api/products       -> 200 (supports ?categoryId= and ?search=)
exports.getProducts = (req, res) => notImplemented(res);

// GET /api/products/:id   -> 200
exports.getProductById = (req, res) => notImplemented(res);

// PUT /api/products/:id   -> 200
exports.updateProduct = (req, res) => notImplemented(res);

// DELETE /api/products/:id -> 200  (reply e.g. { success: true, message: 'Product deleted' })
exports.deleteProduct = (req, res) => notImplemented(res);
