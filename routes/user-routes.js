const passport = require('passport');
const router = require('express').Router();
const User = require('../models/user-model.js');

router.get('/users', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const users = await User.find({}).exec();
    res.json(users);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
