// ============================================================
// PRODUCT ROUTES (owner: Logical883)
// ------------------------------------------------------------
// Routes only say which address goes to which controller function
// (and which checks run first). All connected already.
//
//   productController.js  -> anonymous371  (create, read, update, delete)
//   stockController.js    -> kellscaleb    (stock change + low stock)
//   middleware/validate.js -> Kisha-a11y   (validation)
//
// NOTE: '/low-stock' MUST stay above '/:id'. Otherwise Express
// thinks the word "low-stock" is an id.
// ============================================================
const express = require('express');
const router = express.Router();

const productController = require('../controllers/productController');
const stockController = require('../controllers/stockController');
const { validateId, validateProduct, validateStockChange } = require('../middleware/validate');

router.post('/', validateProduct, productController.createProduct);                  // create
router.get('/', productController.getProducts);                                      // list (+ filters)
router.get('/low-stock', stockController.getLowStockProducts);                       // low stock list
router.get('/:id', validateId, productController.getProductById);                    // get one
router.put('/:id', validateId, validateProduct, productController.updateProduct);    // update
router.patch('/:id/stock', validateId, validateStockChange, stockController.adjustStock); // add/remove stock
router.delete('/:id', validateId, productController.deleteProduct);                  // delete

module.exports = router;
