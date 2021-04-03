import mongoose from 'mongoose';

const { Schema } = mongoose;

const UserSchema = new Schema({
  _id: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
  googleId: {
    type: String,
    index: true,
  },
  votedPosts: {
    type: Number,
  },
  votedComments: {
    type: Number,
  },
  savedPosts: {
    type: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
    default: [],
  },
  savedComments: {
    type: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
    default: [],
  },
  subscribedBlogs: {
    type: [{ type: Schema.Types.ObjectId, ref: 'Blog' }],
    default: [],
  },
}, { timestamps: true });

const UserMongo = mongoose.model('User', UserSchema);

export default UserMongo;
