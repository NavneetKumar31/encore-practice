const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, `An address must belong to an user.`]
    },
    addressType: {
        type: String,
        enum: ['home', 'office'],
        default: 'home'
    },
    name: {
        type: String,
        trim: true,
        required: [true, `Please a name for communication!`]
    },
    mobile: {
        type: Number,
        required: [true, `Please a mobile number for communication!`]
    },
    street: {
        type: String,
        trim: true
    },
    landmark: {
        type: String,
        trim: true
    },
    city: {
        type: String,
        trim: true
    },
    country: {
        type: String,
        trim: true
    },
    pincode: {
        type: Number,
    }
});

addressSchema.pre(/^find/, function (next) {
    this.populate({
        path: 'user',
        select: 'name'
    });
    next();
});

module.exports = mongoose.model('Address', addressSchema);