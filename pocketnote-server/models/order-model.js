const mongoose = require('mongoose');

var paymentInfo = new mongoose.Schema({
    isSuccessful: {
        type: Boolean
    },
    receipt: {
        type: String
    },
    transactionID: {
        type: String
    },
    paidOn: {
        type: Date,
        default: Date.now()
    },
    paidAmount: {
        type: Number
    }
});

const orderSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
    },
    products: {
        type: [mongoose.Schema.ObjectId],
        ref: 'Product',
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, `Cart must belongs to an user.`]
    },
    totalAmount: {
        type: Number
    },
    paymentMode: {
        type: String,
        enum: ['credit card', 'debit card', 'net banking', 'upi', 'cash on delivery'],
        default: 'credit card'
    },
    paymentInfo: {
        type: paymentInfo
    },
    shippingAddress: {
        type: String,
    },
    deliveryAddress: {
        type: String,
    },
    createdOn: {
        type: Date,
        default: Date.now()
    }
});

orderSchema.pre(/^find/, function (next) {
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

module.exports = mongoose.model('Order', orderSchema);