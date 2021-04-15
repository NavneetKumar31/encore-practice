const mongoose = require('mongoose');

// Story Schema
const StorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A tour must have a name'],
        unique: true,
        trim: true
    },
    img: {
        type: String,
        default: 'default.jpg'
    },
    tags: {
        type: [String],
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    createdOn: {
        type: Date
    },
    modifiedOn: {
        type: Date
    }
});

module.exports = mongoose.model('Story', StorySchema);