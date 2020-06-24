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
    required: true,
  },
});

const hashPassword = async function hashPassword(next) {
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
  next();
};

UserSchema.pre('save', hashPassword);

UserSchema.methods.isValidPassword = async function isValidPassword(password) {
  const compare = await bcrypt.compare(password, this.password);
  return compare;
};

const User = mongoose.model('User', UserSchema);

module.exports = User;
