const storyModel = require('../models/story-model');
const factory = require('./factory-controller');

exports.getAll = factory.getAll(storyModel);
exports.getById = factory.getOne(storyModel);
exports.getByAuthor = factory.getOne(storyModel);
exports.create = factory.createOne(storyModel);
exports.update = factory.updateOne(storyModel);
exports.deleteById = factory.deleteOne(storyModel);
exports.deleteAll = factory.deleteAll(storyModel);