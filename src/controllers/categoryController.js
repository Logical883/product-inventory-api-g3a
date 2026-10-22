// ============================================================
// CATEGORY CONTROLLER (owner: Damian-404, branch: feature/categories)
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
//
// EXAMPLE OF THE PATTERN:
//   exports.getCategoryById = (req, res) => {
//     const category = categoryService.getCategoryById(Number(req.params.id));
//     res.status(200).json({ success: true, data: category });
//   };
//
// Reply format:  { success: true, data: ... }     (use 201 for create)
// ============================================================
// const categoryService = require('../services/categoryService');

const notImplemented = (res) =>
  res.status(501).json({ success: false, message: 'Not implemented yet' });

// POST /api/categories   -> 201
exports.createCategory = (req, res) => notImplemented(res);

// GET /api/categories    -> 200
exports.getCategories = (req, res) => notImplemented(res);

// GET /api/categories/:id -> 200
exports.getCategoryById = (req, res) => notImplemented(res);

// PUT /api/categories/:id -> 200
exports.updateCategory = (req, res) => notImplemented(res);

// DELETE /api/categories/:id -> 200  (reply e.g. { success: true, message: 'Category deleted' })
exports.deleteCategory = (req, res) => notImplemented(res);
