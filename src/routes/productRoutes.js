const express = require('express');
const router = express.Router();

const productController = require('../controllers/productController');
const stockController = require('../controllers/stockController');
const { validateId, validateProduct, validateStockChange } = require('../middleware/validate');

router.post('/', validateProduct, productController.createProduct);
router.get('/', productController.getProducts);
// Keep this above /:id so "low-stock" is not treated as an id.
router.get('/low-stock', stockController.getLowStockProducts);
router.get('/:id', validateId, productController.getProductById);
router.put('/:id', validateId, validateProduct, productController.updateProduct);
router.patch('/:id/stock', validateId, validateStockChange, stockController.adjustStock);
router.delete('/:id', validateId, productController.deleteProduct);

module.exports = router;
