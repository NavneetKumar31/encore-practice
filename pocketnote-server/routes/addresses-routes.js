var express = require('express');
var addressRouter = express.Router();
const addressController = require('../controllers/addresses-controllers');

addressRouter.get('/', addressController.getAll);
addressRouter.get('/:id', addressController.getById);
addressRouter.get('/byUser/:user', addressController.getByUser);
addressRouter.post('/', addressController.create);
addressRouter.patch('/:id', addressController.update);
addressRouter.delete('/:id', addressController.deleteById);
addressRouter.delete('/', addressController.deleteAll);

module.exports = addressRouter;