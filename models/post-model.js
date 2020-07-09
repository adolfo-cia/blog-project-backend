const mongoose = require('mongoose');

const { Schema } = mongoose;

const PostSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
  },
  type: {
    type: String,
    enum: ['POST', 'LINK'],
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
  blog: {
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
  votes: {
    type: Number,
    default: 0,
  },
  upVotes: {
    type: [{ type: Schema.Types.ObjectId }],
    default: [],
  },
  downVotes: {
    type: [{ type: Schema.Types.ObjectId }],
    default: [],
  },
  deleted: {
    type: Boolean,
    required: true,
    default: false,
  },
}, { timestamps: true });

function bodyRequired(next) {
  if (!this.deleted && !this.body) {
    next(new Error('body is required'));
  } else {
    next();
  }
}

PostSchema.pre('save', bodyRequired);

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;
