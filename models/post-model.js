const mongoose = require('mongoose');

const { Schema } = mongoose;

const PostSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  body: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['POST', 'LINK'],
    required: true,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  ownerName: {
    type: String,
    required: true,
  },
  blog: {
    type: Schema.Types.ObjectId,
    ref: 'Blog',
    required: true,
  },
  blogName: {
    type: String,
    required: true,
  },
  votedUp: {
    type: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    default: [],
  },
  votedDown: {
    type: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    default: [],
  },
  deleted: {
    type: Boolean,
    required: true,
    default: false,
  },
}, { timestamps: true });

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;
