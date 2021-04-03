import jwt from 'jsonwebtoken';
import { User } from '../domain';
import { UserRepo } from '../repository';

const generateJWT = async function generateJWT({ id }) {
  const payload = {
    sub: id,
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

const authenticateJWT = async (jwtPayload) => {
  const { sub: id } = jwtPayload;
  const user = await UserRepo.getUserById(id);
  return user;
};

const authenticateGoogle = async (profile) => {
  const user = await UserRepo.getUserByGoogleId(profile.id);
  if (!user) {
    const newUser = await UserRepo.create(
      User({ username: profile.displayName, googleId: profile.id }),
    );
    return newUser;
  }
  return user;
};

export default Object.freeze({
  generateJWT,
  authenticateJWT,
  authenticateGoogle,
});
