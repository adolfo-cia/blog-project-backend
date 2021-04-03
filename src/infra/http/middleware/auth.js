import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';

const GOOGLE_CLIENT_ID = '994807407783-s1j7h1jljjj27na5rlhjnlka396k4en8.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = 'MrHwpUY07Sw3GGsgk1DvXn69';

export default (AuthService) => {
  passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'mySecret',
    algorithms: ['HS256'],
  },
  async (jwtPayload, done) => {
    try {
      const user = await AuthService.authenticateJWT(jwtPayload);

      return user ? done(null, user) : done(null, false);
    } catch (err) {
      return done(err, false);
    }
  }));

  passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: '/api/v1/users/google/redirect',
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      const user = await AuthService.authenticateGoogle(profile);
      return done(null, user);
    } catch (err) {
      return done(err, null);
    }
  }));
};
