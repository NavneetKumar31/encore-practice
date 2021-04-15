const subcategoryModel = require('../models/subcategory-model');
const factory = require('./factory-controller');

exports.getAll = factory.getAll(subcategoryModel);
exports.getById = factory.getOne(subcategoryModel);
exports.create = factory.createOne(subcategoryModel);
exports.update = factory.updateOne(subcategoryModel);
exports.deleteById = factory.deleteOne(subcategoryModel);
exports.deleteAll = factory.deleteAll(subcategoryModel);