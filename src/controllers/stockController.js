// ============================================================
// STOCK CONTROLLER (owner: kellscaleb, branch: feature/stock-logic)
// ------------------------------------------------------------
// The controller is the "waiter": it takes the request, hands it to the
// service, and brings back the response.
//
// RULES FOR THIS LAYER
//  - Read from req, call ONE service function, send res.
//  - NO stock rules here (those live in stockService.js) and NEVER touch repositories.
//  - No try/catch needed: AppErrors thrown by the service reach the error handler.
//  - The :id arrives as TEXT: Number(req.params.id)
//
// EXAMPLE OF THE PATTERN:
//   exports.adjustStock = (req, res) => {
//     const product = stockService.adjustStock(Number(req.params.id), req.body.change);
//     res.status(200).json({ success: true, data: product });
//   };
// ============================================================
// const stockService = require('../services/stockService');

const notImplemented = (res) =>
  res.status(501).json({ success: false, message: 'Not implemented yet' });

// PATCH /api/products/:id/stock   body: { "change": -3 }  -> 200
exports.adjustStock = (req, res) => notImplemented(res);

// GET /api/products/low-stock  -> 200
exports.getLowStockProducts = (req, res) => notImplemented(res);
