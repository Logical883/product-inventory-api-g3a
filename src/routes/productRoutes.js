// ============================================================
// Product routes: the "addresses" (owner: Logical883)
// Already connected to the controller + validation functions.
//
//   productController.js        -> anonymous371  (create + read)
//   productModifyController.js  -> Damian-404    (update + delete)
//   stockController.js          -> kellscaleb    (stock + low stock)
//   middleware/validate.js      -> Kisha-a11y    (validation)
//
// NOTE: '/low-stock' MUST stay above '/:id'. Otherwise Express
// thinks the word "low-stock" is an id.
// ============================================================
const express = require('express');
const router = express.Router();

const productController = require('../controllers/productController');
const modifyController = require('../controllers/productModifyController');
const stockController = require('../controllers/stockController');
const { validateProduct, validateStockChange } = require('../middleware/validate');

router.post('/', validateProduct, productController.createProduct);       // create
router.get('/', productController.getProducts);                           // list (+ filters)
router.get('/low-stock', stockController.getLowStockProducts);            // low stock list
router.get('/:id', productController.getProductById);                     // get one
router.put('/:id', validateProduct, modifyController.updateProduct);      // update
router.patch('/:id/stock', validateStockChange, stockController.adjustStock); // add/remove stock
router.delete('/:id', modifyController.deleteProduct);                    // delete

module.exports = router;
