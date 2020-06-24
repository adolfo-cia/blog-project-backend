const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const jwt = require('jsonwebtoken');
const User = require('../models/user-model.js');

const generateJWT = function generateJWT(user) {
  const { _id } = user;

  const payload = {
    sub: _id,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 60,
  };

  return new Promise((resolve) => {
    jwt.sign(payload, 'mySecret', { algorithm: 'HS256' },
      (err, token) => resolve({ token: `Bearer ${token}` }));
  });
};

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'mySecret',
  algorithms: ['HS256'],
};

passport.use(
  new JwtStrategy(
    options,
    async (jwtPayload, done) => {
      try {
        const user = await User.findById(jwtPayload.sub).exec();
        if (user) {
          done(null, user);
        } else {
          done(null, false);
        }
      } catch (err) {
        done(err, false);
      }
    },
  ),
);

module.exports = {
  generateJWT,
};
