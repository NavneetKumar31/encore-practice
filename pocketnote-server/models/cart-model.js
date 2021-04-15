const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        enum: ['shopping cart', 'whish-list cart'],
        default: 'shopping cart'
    },
    products: {
        type: [mongoose.Schema.ObjectId],
        ref: 'Product',
    },
    totalAmount: {
        type: Number
    },
    addedOn: {
        type: Date,
        default: Date.now()
    },
    modifiedOn: {
        type: Date,
        default: Date.now()
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, `Cart must belongs to an user.`]
    }
});

cartSchema.pre(/^find/, function (next) {
    this.populate({
        path: 'products',
        select: 'name description sellingPrice discount isAvailable stock'
    });
    this.populate({
        path: 'user',
        select: 'name mobile email'
    });
    next();
});

module.exports = mongoose.model('Cart', cartSchema);