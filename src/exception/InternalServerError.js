import BaseError from './BaseError';

export default class InternalServerError extends BaseError {
  constructor(message) {
    super(500, message);
  }
}
