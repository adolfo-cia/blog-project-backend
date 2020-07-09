const Comment = require('../models/comment-model.js');

module.exports = {

  getAll: async (req, res) => Comment.find({}).sort({ path: -1 }).exec(),

  create: async (req, res) => {

  },

};
