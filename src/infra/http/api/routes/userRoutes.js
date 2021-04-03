import express from 'express';
import { createExpressCallback, redirectFromGoogle, redirectToGoogle } from '../../middleware';
import { loginController, loginGoogleCallbackController, registerController } from '../controllers';

const userRouter = express.Router();

userRouter.post('/register', createExpressCallback(registerController));
userRouter.get('/google', redirectToGoogle());
userRouter.get('/google/redirect', redirectFromGoogle(), createExpressCallback(loginGoogleCallbackController));
userRouter.post('/login', createExpressCallback(loginController));

export default userRouter;
