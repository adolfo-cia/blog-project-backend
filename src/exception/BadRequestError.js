import BaseError from './BaseError';

export default class BadRequestError extends BaseError {
  constructor(message) {
    super(400, message);
  }
}
