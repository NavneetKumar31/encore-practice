const catchAsync = require('../helpers/catchErrors');
const AppError = require('../helpers/error-handler');
const APIFeatures = require('../helpers/apiFeatures');

exports.getAll = Model => catchAsync(async (req, res, next) => {
    const features = new APIFeatures(Model.find({}), req.query)
        .filter()
        .sort()
        .limitFields()
        .paginate();
    const docs = await features.query;

    if (docs.length < 1) {
        return next(new AppError('No documents found with that ID', 404));
    }

    return res.status(200).json({
        success: true,
        message: `get all documents from DB.`,
        results: docs
    });
});

exports.getOne = (Model, popOptions) => catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id);
    if (popOptions) query = query.populate(popOptions);
    const doc = await query;

    if (!doc) {
        return next(new AppError('No document found with that ID', 404));
    }

    res.status(200).json({
        success: true,
        message: `get all document with requested id from DB.`,
        results: doc
    });
});

exports.createOne = Model => catchAsync(async (req, res, next) => {
    const newObj = new Model();
    for (let key in req.body) {
        newObj[key] = req.body[key]
        console.log(key);
    }
    console.log(newObj);
    const doc = await Model.create(newObj);

    res.status(201).json({
        success: true,
        message: `created document with requested data in DB.`,
        results: req.body
    });
});

exports.updateOne = Model => catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    if (!doc) {
        return next(new AppError('No document found with that ID', 404));
    }

    res.status(200).json({
        success: true,
        message: `updated document with requested id from DB.`,
        results: doc
    });
});

exports.deleteOne = Model => catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
        return next(new AppError('No document found with that ID', 404));
    }

    res.status(200).json({
        success: true,
        message: `removed document with requested id from DB.`,
        results: []
    });
});

exports.deleteAll = Model => catchAsync(async (req, res, next) => {
    const doc = await Model.remove({});

    if (!doc) {
        return next(new AppError('No document found with that ID', 404));
    }

    res.status(200).json({
        success: true,
        message: `removed all documents from DB.`,
        results: []
    });
});