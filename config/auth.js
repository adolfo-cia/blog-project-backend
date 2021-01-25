const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const jwt = require('jsonwebtoken');
const User = require('../models/user-model.js');

const GOOGLE_CLIENT_ID = '994807407783-s1j7h1jljjj27na5rlhjnlka396k4en8.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = 'MrHwpUY07Sw3GGsgk1DvXn69';

module.exports.generateJWT = async function generateJWT(user) {
  const { _id } = user;
  const payload = {
    sub: _id,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + (60 * 15),
  };
  return new Promise((resolve, reject) => {
    jwt.sign(payload, 'mySecret', { algorithm: 'HS256' }, (err, token) => {
      if (err) {
        reject(err);
      } else {
        resolve({ token: `Bearer ${token}` });
      }
    });
  });
};

passport.use(new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'mySecret',
  algorithms: ['HS256'],
},
(jwtPayload, done) => {
  User.findById(jwtPayload.sub)
    .then((user) => {
      if (user) {
        done(null, user);
      } else {
        done(null, false);
      }
    })
    .catch((err) => done(err, false));
}));

passport.use(new GoogleStrategy({
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: '/auth/google/redirect',
},
async (accessToken, refreshToken, profile, done) => {
  User.findOne({ googleId: profile.id })
    .then((user) => {
      if (user) {
        const { _id } = user;
        done(null, _id);
      } else {
        User.create({
          username: profile.displayName,
          googleId: profile.id,
        })
          .then((newUser) => {
            const { _id } = newUser;
            done(null, _id);
          });
      }
    })
    .catch((err) => done(err, null));
}));
