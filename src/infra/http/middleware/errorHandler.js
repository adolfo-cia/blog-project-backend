import BaseError from '../../../exception/BaseError';

export default (err, req, res, next) => {
  if (err instanceof BaseError) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  return res.status(500).json({ message: err.message, stack: err.stack });
};
