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
    required: false,
  },
  googleId: {
    type: String,
    required: false,
  },
});

const validatePassword = async function validatePassword(next) {
  return new Promise((resolve, reject) => {
    if (!this.password && !this.googleId) {
      reject(new Error('password is required'));
    } else {
      resolve(next());
    }
  });
};

const hashPassword = async function hashPassword(next) {
  if (this.password) {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
  }
  next();
};

UserSchema.pre('save', validatePassword);
UserSchema.pre('save', hashPassword);

UserSchema.methods.isValidPassword = async function isValidPassword(password) {
  const compare = await bcrypt.compare(password, this.password);
  return compare;
};

const User = mongoose.model('User', UserSchema);

module.exports = User;
