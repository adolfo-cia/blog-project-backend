const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const { Schema } = mongoose;

const UserSchema = new Schema({
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
  ownedBlogs: {
    type: [{ type: Schema.Types.ObjectId, ref: 'Blog' }],
    default: [],
  },
}, { timestamps: true });

const validatePassword = async function validatePassword() {
  return new Promise((resolve, reject) => {
    if (!this.password && !this.googleId) {
      reject(new Error('password is required'));
    } else {
      resolve();
    }
  });
};

const hashPassword = async function hashPassword() {
  try {
    if (this.password) {
      const hash = await bcrypt.hash(this.password, 10);
      this.password = hash;
    }
  } catch (err) {
    throw new Error('Error while hashing password');
  }
};

UserSchema.pre('save', validatePassword);
UserSchema.pre('save', hashPassword);

UserSchema.methods.isValidPassword = async function isValidPassword(password) {
  const compare = await bcrypt.compare(password, this.password);
  return compare;
};

const User = mongoose.model('User', UserSchema);

module.exports = User;
