const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter product name!'],
        unique: true,
        trim: true
    },
    brand: {
        type: String,
        required: [true, `Please enter product's brand name!`],
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    category: {
        type: mongoose.Schema.ObjectId,
        ref: 'Category',
        required: [true, 'Category must belongs to a product.']
    },
    subcategory: {
        type: mongoose.Schema.ObjectId,
        ref: 'Subcategory',
        required: [true, 'Subcategory must belongs to a product.']
    },
    features: {
        type: [String]
    },
    tags: {
        type: [String]
    },
    imgs: {
        type: String
    },
    buyingPrice: {
        type: Number
    },
    sellingPrice: {
        type: Number
    },
    discount: {
        type: Number
    },
    isAvailable: {
        type: Boolean
    },
    stock: {
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
    addedBy: {
        type: String,
        trim: true
    }
});

productSchema.pre(/^find/, function (next) {
    this.populate({
        path: 'category',
        select: 'name type description'
    });
    this.populate({
        path: 'subcategory',
        select: 'name type description'
    });
    next();
});

module.exports = mongoose.model('Product', productSchema);