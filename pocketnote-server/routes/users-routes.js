var express = require('express');
var userRouter = express.Router();
const userController = require('../controllers/user-controller');

// will return all users from db
userRouter.get('/', userController.all);

// will return user with requested ID from db
userRouter.get('/:id', userController.getById);

// will authenticate the user
userRouter.post('/authenticate', userController.authenticateUser);

// will add an user in db
userRouter.post('/', userController.create);

// will update an user in db
userRouter.patch('/:id', userController.updateById);

// will delete user with request ID from db
userRouter.delete('/:id', userController.deleteById);

module.exports = userRouter;