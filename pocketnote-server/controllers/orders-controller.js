const orderModel = require('../models/order-model');
const factory = require('./factory-controller');
const catchAsync = require('../helpers/catchErrors');
const AppError = require('../helpers/error-handler');

exports.getAll = factory.getAll(orderModel);
exports.getById = factory.getOne(orderModel);
exports.create = factory.createOne(orderModel);
exports.update = factory.updateOne(orderModel);
exports.deleteById = factory.deleteOne(orderModel);
exports.deleteAll = factory.deleteAll(orderModel);

exports.getByUser = catchAsync(async (req, res, next) => {
    const docs = await orderModel.find({
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