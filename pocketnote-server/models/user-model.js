const mongoose = require('mongoose');

// User Schema
var UserSchema = mongoose.Schema({
    name: {
        type: String
    },
    mobile: {
        type: Number,
        trim: true,
        index: {
            unique: true
        }
    },
    email: {
        type: String,
        trim: true,
        index: {
            unique: true
        }
    },
    password: {
        type: String
    },
    gender: {
        type: String,
        trim: true
    },
    registeredOn: {
        type: Date
    }
});

module.exports = mongoose.model('User', UserSchema);