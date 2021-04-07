const userModel = require('../models/user-model');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const config = require('../configurations/database');

const userController = {
    all(req, res) {
        userModel.find({}).exec((err, users) => {
            if (err) {
                res.status(500).json({
                    success: false,
                    message: 'something bad happen, please try again...',
                    results: [],
                    err: err
                });
            }

            if (users.length < 1) {
                res.status(200).json({
                    success: true,
                    message: 'there is no users in db.',
                    results: users,
                    err: null
                });
            }

            res.status(200).json({
                success: true,
                message: 'successfully get all users',
                results: users,
                err: null
            });
        });
    },

    getById(req, res) {
        const idParam = req.params.id;
        userModel.findOne({
            _id: idParam
        }).exec((err, user) => {
            if (err) {
                res.status(500).json({
                    success: false,
                    message: 'something bad happen, please try again...',
                    results: [],
                    err: err
                });
            }

            if (!user) {
                res.status(200).json({
                    success: true,
                    message: 'there is no user in db with request id.',
                    results: user,
                    err: null
                });
            }

            res.status(200).json({
                success: true,
                message: 'successfully get user by id >> ' + idParam,
                results: user,
                err: null
            });
        });
    },

    create(req, res) {
        const newUser = new userModel();
        for (let key in req.body) {
            newUser[key] = req.body[key];
        }
        newUser.registeredOn = Date.now();
        userModel.findOne({
            email: newUser.email
        }).exec((err, user) => {
            if (err) {
                res.status(500).json({
                    success: false,
                    message: `something bad happen, please try again...`,
                    results: [],
                    err: err
                });
            }

            if (user) {
                res.status(200).json({
                    success: false,
                    message: `user already present with email >> ${newUser.email}`,
                    results: user,
                    err: null
                });
            }

            bcrypt.hash(newUser.password, 10, (err, hashedPassword) => {
                if (err) {
                    res.status(500).json({
                        success: false,
                        message: `something bad happen, please try again...`,
                        results: [],
                        err: err
                    });
                }

                newUser.password = hashedPassword;

                newUser.save((err, saved) => {
                    if (err) {
                        res.status(500).json({
                            success: false,
                            message: `something bad happen, please try again...`,
                            results: [],
                            err: err
                        });
                    }

                    res.status(201).json({
                        success: true,
                        message: `user with email ${newUser.email} successfully registered.`,
                        results: newUser,
                        err: null
                    });
                });
            });
        });
    },

    updateById(req, res) {
        let updatedUser = {
            $set: {}
        };

        for (let key in req.body) {
            updatedUser[key] = req.body[key];
        }

        userModel.update({
            _id: req.params.id
        }, updatedUser).exec((err, users) => {
            if (err) {
                res.status(500).json({
                    success: false,
                    message: 'something bad happen, please try again...',
                    results: [],
                    err: err
                });
            }

            if (users.nModified < 1) {
                res.status(200).json({
                    success: true,
                    message: 'there is no user in db with id >> ' + req.params.id,
                    results: [],
                    err: null
                });
            }

            res.status(200).json({
                success: true,
                message: 'successfully updated the user with id >> ' + req.params.id,
                results: [],
                err: null
            });
        });
    },

    deleteById(req, res) {
        const idParam = req.params.id;
        userModel.findOne({
            _id: idParam
        }).remove((err, removed) => {
            if (err) {
                res.status(500).json({
                    success: false,
                    message: 'something bad happen, please try again...',
                    results: [],
                    err: err
                });
            }

            res.status(200).json({
                success: true,
                message: 'successfully deleted the user with id >> ' + req.params.id,
                results: [],
                err: null
            });
        })
    },

    authenticateUser(req, res) {
        let user = new userModel();
        for (let key in req.body) {
            user[key] = req.body[key];
        }

        userModel.findOne({
            email: user.email
        }).exec((err, doc) => {
            if (err) {
                res.status(500).json({
                    success: false,
                    message: 'something bad happen, please try again...',
                    results: [],
                    err: err
                });
            }

            if (!doc) {
                res.status(403).json({
                    success: true,
                    message: `unable to find user with email >> ` + user.email,
                    results: [],
                    err: null
                })
            }

            bcrypt.compare(user.password, doc.password, (err, isMatch) => {
                if (err) {
                    res.status(403).json({
                        success: false,
                        message: `something bad happen, please try again...`,
                        results: [],
                        err: err
                    });
                }

                if (isMatch) {
                    const token = jwt.sign({
                            data: doc
                        },
                        config.secret, {
                            expiresIn: '1h'
                        }
                    );

                    res.status(200).json({
                        success: true,
                        message: 'User authenticated for > ' + user.email,
                        token: token,
                        results: doc,
                        err: null
                    });
                }

                res.status(401).json({
                    success: false,
                    message: `password doesn't match...`,
                    results: [],
                    err: err
                });
            });
        });
    }
};

module.exports = userController;