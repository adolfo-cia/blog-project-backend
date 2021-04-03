import BaseError from './BaseError';

export default class NotFoundError extends BaseError {
  constructor(message) {
    super(404, message);
  }
}
