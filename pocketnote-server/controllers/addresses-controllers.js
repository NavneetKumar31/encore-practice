const addressModel = require('../models/address-model');
const factory = require('./factory-controller');
const catchAsync = require('../helpers/catchErrors');
const AppError = require('../helpers/error-handler');

exports.getAll = factory.getAll(addressModel);
exports.getById = factory.getOne(addressModel);
exports.create = factory.createOne(addressModel);
exports.update = factory.updateOne(addressModel);
exports.deleteById = factory.deleteOne(addressModel);
exports.deleteAll = factory.deleteAll(addressModel);

exports.getByUser = catchAsync(async (req, res, next) => {
    const docs = await addressModel.find({
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