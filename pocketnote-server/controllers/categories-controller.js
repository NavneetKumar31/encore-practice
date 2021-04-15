const categoryModel = require('../models/category-model');
const factory = require('./factory-controller');

exports.getAll = factory.getAll(categoryModel);
exports.getById = factory.getOne(categoryModel);
exports.create = factory.createOne(categoryModel);
exports.update = factory.updateOne(categoryModel);
exports.deleteById = factory.deleteOne(categoryModel);
exports.deleteAll = factory.deleteAll(categoryModel);