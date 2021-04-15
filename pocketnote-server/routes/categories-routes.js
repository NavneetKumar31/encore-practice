var express = require('express');
var categoryRouter = express.Router();
const categoryController = require('../controllers/categories-controller');

categoryRouter.get('/', categoryController.getAll);
categoryRouter.get('/:id', categoryController.getById);
categoryRouter.post('/', categoryController.create);
categoryRouter.patch('/:id', categoryController.update);
categoryRouter.delete('/:id', categoryController.deleteById);
categoryRouter.delete('/', categoryController.deleteAll);

module.exports = categoryRouter;