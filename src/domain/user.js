import BadRequestError from '../exception/BadRequestError';

export default function buildUser(IdService, CryptoService) {
  return function User({
    id = IdService.makeId(),
    username,
    password,
    googleId,
    createdOn = Date.now(),
    modifiedOn = Date.now(),
  } = {}) {
    if (!IdService.isValid(id)) {
      throw new BadRequestError('User must have a valid Id.');
    }
    if (!username) {
      throw new BadRequestError('User must have a username.');
    }
    if (username.length < 3) {
      throw new BadRequestError('User usename must be longer than 3 characters');
    }
    if (!googleId && !password) {
      throw new BadRequestError('User must have a password.');
    }
    if (password && password.length < 3) {
      throw new BadRequestError('User password must be longer than 3 characters');
    }
    return Object.freeze({
      getId: () => id,
      getUsername: () => username,
      getPassword: () => password,
      getGoogleId: () => googleId,
      getCreatedOn: () => createdOn,
      getModifiedOn: () => modifiedOn,
      hashPassword: async () => { password = await CryptoService.hashPassword(password); },
      isValidPassword: async (pass) => CryptoService.isValidPassword(pass, password),
      toJSON: () => ({
        id,
        username,
        password,
        googleId,
        createdOn,
        modifiedOn,
      }),
    });
  };
}
