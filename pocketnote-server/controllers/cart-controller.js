const cartModel = require('../models/cart-model');
const factory = require('./factory-controller');
const catchAsync = require('../helpers/catchErrors');
const AppError = require('../helpers/error-handler');

exports.getAll = factory.getAll(cartModel);
exports.getById = factory.getOne(cartModel);
exports.create = factory.createOne(cartModel);
exports.update = factory.updateOne(cartModel);
exports.deleteById = factory.deleteOne(cartModel);
exports.deleteAll = factory.deleteAll(cartModel);

exports.getByUser = catchAsync(async (req, res, next) => {
    const docs = await cartModel.find({
        user: req.params.user
    });

    if (docs.length < 1) {
        return next(new AppError('No document found with that author', 404));
    }

    return res.status(200).json({
        success: true,
        message: `get all document with requested user from DB.`,
        results: docs
    });
});