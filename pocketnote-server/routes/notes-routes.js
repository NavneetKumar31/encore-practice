var express = require('express');
var noteRouter = express.Router();
const noteController = require('../controllers/note-controller');

// will return all notes from db
noteRouter.get('/', noteController.all);

// will return note with requested ID from db
noteRouter.get('/:id', noteController.getById);

// will return note with requested user from db
noteRouter.get('/byAuthor/:author', noteController.getByAuthor);

// will add an note in db
noteRouter.post('/', noteController.create);

// will update an note in db
noteRouter.patch('/:id', noteController.updateById);

// will delete note with request ID from db
noteRouter.delete('/:id', noteController.deleteById);

module.exports = noteRouter;