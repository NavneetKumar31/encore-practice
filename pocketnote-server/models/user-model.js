const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// User Schema
var UserSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        lowercase: true
    },
    mobile: {
        type: Number,
        trim: true,
        unique: true,
        required: [true, `An user must have a mobile number`]
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        lowercase: true,
        required: [true, `An user must have a email`]
    },
    password: {
        type: String,
        required: [true, `An user must have a password`],
        minlength: 8,
        select: false
    },
    gender: {
        type: String,
        trim: true,
        lowercase: true
    },
    dob: {
        type: Date,
        trim: true
    },
    registeredOn: {
        type: Date,
        trim: true
    }
});

UserSchema.pre('save', async function (next) {
    // Only run this function if password was actually modified
    if (!this.isModified('password')) return next();

    // Hash the password with cost of 12
    this.password = await bcrypt.hash(this.password, 12);

    next();
});

module.exports = mongoose.model('User', UserSchema);