const express = require('express');
const router = express.Router();

const controller = require('../controllers/categoryController');
const { validateId, validateCategory } = require('../middleware/validate');

router.post('/', validateCategory, controller.createCategory);
router.get('/', controller.getCategories);
router.get('/:id', validateId, controller.getCategoryById);
router.put('/:id', validateId, validateCategory, controller.updateCategory);
router.delete('/:id', validateId, controller.deleteCategory);

module.exports = router;
