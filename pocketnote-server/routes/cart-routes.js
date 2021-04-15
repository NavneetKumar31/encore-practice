var express = require('express');
var cartRouter = express.Router();
const cartController = require('../controllers/cart-controller');

cartRouter.get('/', cartController.getAll);
cartRouter.get('/:id', cartController.getById);
cartRouter.get('/:user', cartController.getByUser);
cartRouter.post('/', cartController.create);
cartRouter.patch('/:id', cartController.update);
cartRouter.delete('/:id', cartController.deleteById);
cartRouter.delete('/', cartController.deleteAll);

module.exports = cartRouter;