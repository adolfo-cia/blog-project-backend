import { User } from '../domain';
import BadRequestError from '../exception/BadRequestError';

export default function buildRegisterUser(UserRepo) {
  return async function registerUser({ username, password }) {
    const exists = await UserRepo.exists(username);
    if (exists) {
      throw new BadRequestError('username already exists');
    }
    const user = User({ username, password });
    await user.hashPassword();
    await UserRepo.create(user);
  };
}
