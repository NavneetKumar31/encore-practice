var express = require('express');
var orderRouter = express.Router();
const orderController = require('../controllers/orders-controller');

orderRouter.get('/', orderController.getAll);
orderRouter.get('/:id', orderController.getById);
orderRouter.get('/:user', orderController.getByUser);
orderRouter.post('/', orderController.create);
orderRouter.patch('/:id', orderController.update);
orderRouter.delete('/:id', orderController.deleteById);
orderRouter.delete('/', orderController.deleteAll);

module.exports = orderRouter;