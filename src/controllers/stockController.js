const stockService = require('../services/stockService');

exports.adjustStock = (req, res) => {
  const product = stockService.adjustStock(Number(req.params.id), req.body.change);
  res.status(200).json({ success: true, data: product });
};

exports.getLowStockProducts = (req, res) => {
  const products = stockService.getLowStockProducts();
  res.status(200).json({ success: true, data: products });
};
