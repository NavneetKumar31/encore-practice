const mongoose = require('mongoose');

// User Schema
var NoteSchema = mongoose.Schema({
    title: {
        type: String
    },
    description: {
        type: String,
    },
    createdOn: {
        type: Date
    },
    modifiedOn: {
        type: Date
    },
    author: {
        type: String
    }
});

module.exports = mongoose.model('Note', NoteSchema);