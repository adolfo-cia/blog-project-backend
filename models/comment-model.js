const mongoose = require('mongoose');

const { Schema } = mongoose;

const CommentSchema = new Schema({
  body: {
    type: String,
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
  post: {
    type: Schema.Types.ObjectId,
    ref: 'Post',
    required: true,
  },
  postName: {
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

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;
