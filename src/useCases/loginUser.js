import BadRequestError from '../exception/BadRequestError';

export default function buildLoginUser(UserRepo, AuthService) {
  return async function loginUser({ username, password }) {
    const user = await UserRepo.getUserByUsername(username);
    if (!user || !await user.isValidPassword(password)) {
      throw new BadRequestError('wrong username or password');
    }
    return AuthService.generateJWT(user);
  };
}
