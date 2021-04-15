var express = require('express');
var storiesRouter = express.Router();
const storiesController = require('../controllers/stories-controller');

storiesRouter.get('/', storiesController.getAll);
storiesRouter.get('/:id', storiesController.getById);
storiesRouter.get('/byAuthor/:author', storiesController.getByAuthor);
storiesRouter.post('/', storiesController.create);
storiesRouter.patch('/:id', storiesController.update);
storiesRouter.delete('/:id', storiesController.deleteById);
storiesRouter.delete('/', storiesController.deleteAll);

module.exports = storiesRouter;