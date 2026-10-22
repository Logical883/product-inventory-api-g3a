// ============================================================
// CATEGORY ROUTES (owner: Logical883)
// ------------------------------------------------------------
// Routes are the "signboard at the door": they only say which address
// goes to which controller function (and which checks run first).
// All connected already. Nobody else needs to edit this file.
// ============================================================
const express = require('express');
const router = express.Router();

const controller = require('../controllers/categoryController');
const { validateId, validateCategory } = require('../middleware/validate');

router.post('/', validateCategory, controller.createCategory);              // create
router.get('/', controller.getCategories);                                  // list all
router.get('/:id', validateId, controller.getCategoryById);                 // get one
router.put('/:id', validateId, validateCategory, controller.updateCategory); // update
router.delete('/:id', validateId, controller.deleteCategory);               // delete

module.exports = router;
