const router = require('express').Router();
const { generateJWT } = require('../config/auth.js');
const User = require('../models/user-model.js');

router.post('/register', async (req, res) => {
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
});

router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username }).exec();
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
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
