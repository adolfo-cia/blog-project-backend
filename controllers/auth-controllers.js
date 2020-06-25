const { generateJWT } = require('../config/auth.js');
const User = require('../models/user-model.js');

module.exports.registerController = async function registerController(req, res) {
  User.findOne({ username: req.body.username }).then(
    () => res.status(400).json({ msg: 'username already exists' }),
    async () => {
      const user = new User({
        username: req.body.username,
        password: req.body.password,
      });

      try {
        const savedUser = await user.save();
        res.json(await generateJWT(savedUser));
      } catch (err) {
        res.status(400).json(err);
      }
    },
  );
};

module.exports.loginController = async function loginController(req, res) {
  User.findOne({ username: req.body.username }).then(
    async (user) => {
      if (user) {
        const validPassword = await user.isValidPassword(req.body.password);
        if (validPassword) {
          res.json(await generateJWT(user));
        } else {
          res.status(401).json({ msg: 'wrong username or password' });
        }
      } else {
        res.status(401).json({ msg: 'wrong username or password' });
      }
    },
    (err) => res.status(400).json(err),
  );
};
