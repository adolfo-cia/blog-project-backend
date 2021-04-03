import { loginGogleCallback, loginUser, registerUser } from '../../../../useCases';
import buildLoginContoller from './loginController';
import buildLoginGoogleCallbackContoller from './loginGoogleCallbackController';
import buildRegisterContoller from './registerController';

const registerController = buildRegisterContoller(registerUser);
const loginController = buildLoginContoller(loginUser);
const loginGoogleCallbackController = buildLoginGoogleCallbackContoller(loginGogleCallback);

export { registerController, loginController, loginGoogleCallbackController };
