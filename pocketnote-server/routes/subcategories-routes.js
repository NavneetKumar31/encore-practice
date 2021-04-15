var express = require('express');
var subcategoryRouter = express.Router();
const subcategoryController = require('../controllers/subcategory-controller');

subcategoryRouter.get('/', subcategoryController.getAll);
subcategoryRouter.get('/:id', subcategoryController.getById);
subcategoryRouter.post('/', subcategoryController.create);
subcategoryRouter.patch('/:id', subcategoryController.update);
subcategoryRouter.delete('/:id', subcategoryController.deleteById);
subcategoryRouter.delete('/', subcategoryController.deleteAll);

module.exports = subcategoryRouter;