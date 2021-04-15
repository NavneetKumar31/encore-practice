const productModel = require('../models/product-model');
const factory = require('./factory-controller');
const catchAsync = require('../helpers/catchErrors');
const AppError = require('../helpers/error-handler');

exports.getAll = factory.getAll(productModel);
exports.getById = factory.getOne(productModel);
exports.create = factory.createOne(productModel);
exports.update = factory.updateOne(productModel);
exports.deleteById = factory.deleteOne(productModel);
exports.deleteAll = factory.deleteAll(productModel);

exports.getByCategory = catchAsync(async (req, res, next) => {
    const docs = await productModel.find({
        category: req.params.category
    });

    if (docs.length < 1) {
        return next(new AppError('No document found with that author', 404));
    }

    return res.status(200).json({
        success: true,
        message: `get all document with requested category from DB.`,
        results: docs
    });
});

exports.getBySubCategory = catchAsync(async (req, res, next) => {
    const docs = await productModel.find({
        subCategory: req.params.subcategory
    });

    if (docs.length < 1) {
        return next(new AppError('No document found with that author', 404));
    }

    return res.status(200).json({
        success: true,
        message: `get all document with requested subCategory from DB.`,
        results: docs
    });
});

exports.getByCategoryAndSubCategory = catchAsync(async (req, res, next) => {
    const docs = await productModel.find({
        category: req.params.category,
        subCategory: req.params.subcategory
    });

    if (docs.length < 1) {
        return next(new AppError('No document found with that author', 404));
    }

    return res.status(200).json({
        success: true,
        message: `get all document with requested category & subCategory from DB.`,
        results: docs
    });
});