const noteModel = require('../models/note-model');

const noteController = {
    all(req, res) {
        // Returns all products
        noteModel.find({}).exec((err, notes) => {
            if (err) {
                res.status(500).json({
                    success: false,
                    message: 'something bad happen, please try again...',
                    results: [],
                    err: err
                });
            }

            if (notes.length < 1) {
                res.status(200).json({
                    success: true,
                    message: 'there is no notes in db.',
                    results: notes,
                    err: null
                });
            }

            res.status(200).json({
                success: true,
                message: 'successfully get all notes',
                results: notes,
                err: null
            });
        });
    },

    getById(req, res) {
        const idParam = req.params.id;
        noteModel.findOne({
            _id: idParam
        }).exec((err, note) => {
            if (err) {
                res.status(500).json({
                    success: false,
                    message: 'something bad happen, please try again...',
                    results: [],
                    err: err
                });
            }

            if (!note) {
                res.status(200).json({
                    success: true,
                    message: 'there is no note in db with request id.',
                    results: note,
                    err: null
                });
            }

            res.status(200).json({
                success: true,
                message: 'successfully get note by id >> ' + idParam,
                results: note,
                err: null
            });
        });
    },

    getByAuthor(req, res) {
        const author = req.params.author;
        console.log(author);
        noteModel.find({
            author: author
        }).exec((err, notes) => {
            if (err) {
                res.status(500).json({
                    success: false,
                    message: 'something bad happen, please try again...',
                    results: [],
                    err: err
                });
            }

            if (!notes) {
                res.status(200).json({
                    success: true,
                    message: 'there is no note in db with requested author.',
                    results: notes,
                    err: null
                });
            }

            res.status(200).json({
                success: true,
                message: 'successfully get note by author >> ' + author,
                results: notes,
                err: null
            });
        });
    },

    create(req, res) {
        // Creates a new record from req body
        const newNote = new noteModel();
        for (let key in req.body) {
            newNote[key] = req.body[key];
        }
        newNote.createdOn = Date.now();
        newNote.modifiedOn = Date.now();

        newNote.save((err, saved) => {
            if (err) {
                res.status(500).json({
                    success: false,
                    message: 'something bad happen, please try again...',
                    results: [],
                    err: err
                });
            }

            noteModel.findOne({
                _id: saved._id
            }).exec((err, note) => {
                if (err) {
                    res.status(500).json({
                        success: false,
                        message: 'something bad happen, please try again...',
                        results: [],
                        err: err
                    });
                }
                res.status(201).json({
                    success: true,
                    message: 'Note added successfully.',
                    results: note,
                    err: null
                });
            });
        });
    },

    updateById(req, res) {
        let updatedNote = {
            $set: {}
        };

        for (let key in req.body) {
            updatedNote[key] = req.body[key];
        }
        updatedNote.modifiedOn = Date.now();

        noteModel.updateOne({
            _id: req.params.id
        }, updatedNote).exec((err, note) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: 'something bad happen, please try again...',
                    results: [],
                    err: err
                });
            }

            res.status(200).json({
                success: true,
                message: 'successfully updated the note with id >> ' + req.params.id,
                results: note,
                err: null
            });
        });
    },

    deleteById(req, res) {
        const idParam = req.params.id;
        // Removes a product
        noteModel.findOne({
            _id: idParam
        }).remove((err, removed) => {
            if (err) {
                res.status(500).json({
                    success: false,
                    message: 'something bad happen, please try again...',
                    results: [],
                    err: err
                });
            }

            res.status(200).json({
                success: true,
                message: 'successfully deleted the user with id >> ' + req.params.id,
                results: [],
                err: null
            });
        })
    }
};

module.exports = noteController;