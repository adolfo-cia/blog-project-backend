import passport from 'passport';
import auth from './auth';
import AuthService from '../../../services/AuthService';
import errorHandler from './errorHandler';
import NotFoundError from '../../../exception/NotFoundError';

const intializeAuth = () => {
  auth(AuthService);
  return passport.initialize();
};

const ensureAuthenticated = () => (req, res, next) => passport.authenticate('jwt', { session: false });

const redirectToGoogle = () => passport.authenticate('google', { scope: ['profile'], session: false });

const redirectFromGoogle = () => passport.authenticate('google', { session: false });

const notFound = (req, res, next) => { throw new NotFoundError('URI not found'); };

const handleError = errorHandler;

const createExpressCallback = (controller) => async (req, res, next) => {
  const httpRequest = {
    body: req.body,
    query: req.query,
    params: req.params,
    ip: req.ip,
    method: req.method,
    path: req.path,
    auth: {
      user: req.user,
      isAuthenticated: () => !!req.user,
    },
    headers: {
      'Content-Type': req.get('Content-Type'),
      Referer: req.get('referer'),
      'User-Agent': req.get('User-Agent'),
    },
  };

  try {
    const httpResponse = await controller(httpRequest);
    res
      .status(httpResponse.statusCode)
      .json(httpResponse.body);
  } catch (err) {
    next(err);
  }
};

export {
  intializeAuth, ensureAuthenticated, redirectToGoogle, redirectFromGoogle,
  notFound,
  handleError,
  createExpressCallback,
};
