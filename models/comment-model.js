const mongoose = require('mongoose');

const { Schema } = mongoose;

const CommentSchema = new Schema({
  body: {
    type: String,
    required: true,
  },
  author: {
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
  post: {
    id: {
      type: Schema.Types.ObjectId,
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
  votes: {
    type: Number,
    default: 0,
  },
  upVoted: {
    type: [{ type: Schema.Types.ObjectId }],
    default: [],
  },
  downVoted: {
    type: [{ type: Schema.Types.ObjectId }],
    default: [],
  },
  slug: {
    type: String,
    required: true,
  },
  fullSlug: {
    type: String,
    required: true,
  },
  level: {
    type: Number,
    required: true,
    default: 1,
  },
  deleted: {
    type: Boolean,
    required: true,
    default: false,
  },
}, { timestamps: true });

CommentSchema.index({ 'post.id': 1, fullSlug: 1 });

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;
