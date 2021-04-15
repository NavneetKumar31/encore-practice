var express = require('express');
var userRouter = express.Router();
const userController = require('../controllers/user-controller');

userRouter.get('/', userController.getAll);
userRouter.get('/:id', userController.getById);
userRouter.post('/authenticate', userController.authenticateUser);
userRouter.post('/', userController.create);
userRouter.patch('/:id', userController.update);
userRouter.delete('/:id', userController.deleteById);
userRouter.delete('/', userController.deleteAll);

module.exports = userRouter;