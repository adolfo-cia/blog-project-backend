const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const jwt = require('jsonwebtoken');
const User = require('../models/user-model.js');

const GOOGLE_CLIENT_ID = '994807407783-s1j7h1jljjj27na5rlhjnlka396k4en8.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = 'MrHwpUY07Sw3GGsgk1DvXn69';

module.exports.generateJWT = function generateJWT(user) {
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

passport.use(
  new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/redirect',
  },
  async (accessToken, refreshToken, profile, cb) => {
    try {
      const user = await User.findOne({ googleId: profile.id }).exec();
      if (user) {
        const { _id } = user;
        cb(null, _id);
      } else {
        const newUser = await new User({
          username: profile.displayName,
          googleId: profile.id,
        }).save();
        const { _id } = newUser;
        cb(null, _id);
      }
    } catch (err) {
      cb(err, null);
    }
  }),
);
