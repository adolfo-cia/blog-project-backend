const { generateJWT } = require('../config/auth.js');
const User = require('../models/user-model.js');

module.exports.registerController = async function registerController(req, res) {
  User.findOne({ username: req.body.username })
    .then(async (user) => {
      if (!user) {
        User.create({
          username: req.body.username,
          password: req.body.password,
        })
          .then(async (savedUser) => res.json(await generateJWT(savedUser)))
          .catch((err) => res.status(500).json({ msg: err.message }));
      } else {
        res.status(400).json({ msg: 'username already exists' });
      }
    })
    .catch((err) => res.status(500).json(err));
};

module.exports.loginController = async function loginController(req, res) {
  User.findOne({ username: req.body.username })
    .then(async (user) => {
      if (user && await user.isValidPassword(req.body.password)) {
        res.json(await generateJWT(user));
      } else {
        res.status(400).json({ msg: 'wrong username or password' });
      }
    })
    .catch((err) => res.status(500).json(err));
};

module.exports.googleRedirectController = async function loginController(req, res) {
  res.json(await generateJWT(req.user));
};
