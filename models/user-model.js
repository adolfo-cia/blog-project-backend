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

function passwordRequired(next) {
  if (!this.password && !this.googleId) {
    next(new Error('password is required'));
  } else {
    next();
  }
}

UserSchema.pre('save', passwordRequired);

UserSchema.methods.isValidPassword = async function isValidPassword(password) {
  const compare = await bcrypt.compare(password, this.password);
  return compare;
};
UserSchema.statics.hashPassword = async function hashPassword(password) {
  let pwd = password;
  if (pwd) {
    try {
      pwd = await bcrypt.hash(pwd, 10);
    } catch (err) {
      throw new Error('Error while hashing password');
    }
  }
  return pwd;
};

const User = mongoose.model('User', UserSchema);

module.exports = User;
