// ============================================================
// Category routes: the "addresses" (owner: Logical883)
// Already connected to the controller + validation functions.
// Akata692 only needs to fill in categoryController.js.
// Kisha-a11y fills in the validation in middleware/validate.js.
// ============================================================
const express = require('express');
const router = express.Router();

const controller = require('../controllers/categoryController');
const { validateCategory } = require('../middleware/validate');

router.post('/', validateCategory, controller.createCategory);   // create
router.get('/', controller.getCategories);                       // list all
router.get('/:id', controller.getCategoryById);                  // get one
router.put('/:id', validateCategory, controller.updateCategory); // update
router.delete('/:id', controller.deleteCategory);                // delete

module.exports = router;
