const mongoose = require('mongoose');

const subcategorySchema = new mongoose.Schema({
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
    category: {
        type: mongoose.Schema.ObjectId,
        ref: 'Category',
        required: [true, 'Subcategory must belongs to a category.']
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

subcategorySchema.pre(/^find/, function (next) {
    this.populate({
        path: 'category',
        select: 'name type description'
    });
    next();
});

module.exports = mongoose.model('Subcategory', subcategorySchema);