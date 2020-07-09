const mongoose = require('mongoose');

const { Schema } = mongoose;

const BlogSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  owner: {
    id: {
      type: Schema.Types.ObjectId,
      required: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
}, { timestamps: true });

const Blog = mongoose.model('Blog', BlogSchema);

module.exports = Blog;
