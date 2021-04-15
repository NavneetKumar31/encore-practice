var express = require('express');
var productRouter = express.Router();
const productController = require('../controllers/product-controller');

productRouter.get('/', productController.getAll);
productRouter.get('/:id', productController.getById);
productRouter.get('/byCategory/:category', productController.getByCategory);
productRouter.get('/bySubCategory/:subcategory', productController.getBySubCategory);
productRouter.get('/byCategoryAndSubCategory/:category/:subcategory', productController.getByCategoryAndSubCategory);
productRouter.post('/', productController.create);
productRouter.patch('/:id', productController.update);
productRouter.delete('/:id', productController.deleteById);
productRouter.delete('/', productController.deleteAll);

module.exports = productRouter;