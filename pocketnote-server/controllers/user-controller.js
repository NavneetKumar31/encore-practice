const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../configurations/database');
const catchAsync = require('../helpers/catchErrors');
const AppError = require('../helpers/error-handler');
const userModel = require('../models/user-model');
const factory = require('./factory-controller');

exports.getAll = factory.getAll(userModel);
exports.getById = factory.getOne(userModel);
exports.create = factory.createOne(userModel);
exports.update = factory.updateOne(userModel);
exports.deleteById = factory.deleteOne(userModel);
exports.deleteAll = factory.deleteAll(userModel);

exports.authenticateUser = catchAsync(async (req, res, next) => {
    let user = new userModel();
    for (let key in req.body) {
        user[key] = req.body[key];
    }

    const doc = await userModel.findOne({
        email: user.email
    });

    if (!doc) {
        return next(new AppError('No document found with that ID', 404));
    }

    bcrypt.compare(user.password, doc.password, (err, isMatch) => {
        if (err) {
            return next(new AppError('Something bad happen in server, please try again', 500));
        }

        if (!isMatch) {
            return next(new AppError(`Password doesn't match...`, 404));
        }

        const token = jwt.sign({
                data: doc
            },
            config.secret, {
                expiresIn: '1h'
            }
        );

        return res.status(200).json({
            success: true,
            message: 'User authenticated for > ' + user.email,
            token: token,
            results: doc,
            err: null
        });
    });
});