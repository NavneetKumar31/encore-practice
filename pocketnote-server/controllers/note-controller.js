const noteModel = require('../models/note-model');
const factory = require('./factory-controller');
const catchAsync = require('../helpers/catchErrors');
const AppError = require('../helpers/error-handler');

exports.getAll = factory.getAll(noteModel);
exports.getById = factory.getOne(noteModel);
exports.create = factory.createOne(noteModel);
exports.update = factory.updateOne(noteModel);
exports.deleteById = factory.deleteOne(noteModel);
exports.deleteAll = factory.deleteAll(noteModel);

exports.getByAuthor = catchAsync(async (req, res, next) => {
    const docs = await noteModel.find({
        author: req.params.author
    });

    if (docs.length < 1) {
        return next(new AppError('No document found with that author', 404));
    }

    return res.status(200).json({
        success: true,
        message: `get all document with requested author from DB.`,
        results: docs
    });
});