import AuthService from '../services/AuthService';
import buildLoginUser from './loginUser';
import buildRegisterUser from './registerUser';
import { UserRepo } from '../repository';
import buildLoginGoogleCallback from './loginGoogeCallback';

const registerUser = buildRegisterUser(UserRepo);
const loginUser = buildLoginUser(UserRepo, AuthService);
const loginGogleCallback = buildLoginGoogleCallback(AuthService);

export { registerUser, loginUser, loginGogleCallback };
