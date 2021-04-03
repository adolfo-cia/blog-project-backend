import mongoose from 'mongoose';

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
  upVotes: {
    type: [{ type: Schema.Types.ObjectId }],
    default: [],
  },
  downVotes: {
    type: [{ type: Schema.Types.ObjectId }],
    default: [],
  },
  parentId: {
    type: Schema.Types.ObjectId,
    index: true,
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
CommentSchema.index({ 'post.id': 1, slug: 1 });

const CommentMongo = mongoose.model('Comment', CommentSchema);

export default CommentMongo;
