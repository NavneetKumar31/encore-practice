const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        unique: true,
        required: [true, `Please enter a name for category!`]
    },
    type: {
        type: String,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    addedOn: {
        type: Date,
        default: Date.now()
    },
    modifiedOn: {
        type: Date,
        default: Date.now()
    },
    addedBy: {
        type: String,
        trim: true
    }
});

module.exports = mongoose.model('Category', categorySchema);