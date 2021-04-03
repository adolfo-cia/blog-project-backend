import BadRequestError from '../exception/BadRequestError';

export default function buildBlog(IdService, User) {
  return function Blog({
    id = IdService.makeId(),
    name,
    description,
    owner,
    createdOn = Date.now(),
    modifiedOn = Date.now(),
  }) {
    if (!IdService.isValid(id)) {
      throw new BadRequestError('Blog must have a valid Id.');
    }
    if (!name) {
      throw new BadRequestError('Blog must have a name.');
    }
    if (name.length < 3) {
      throw new BadRequestError('Blog name must be longer than 3 characters');
    }
    if (!description) {
      throw new BadRequestError('Blog must have a description.');
    }
    if (description.length < 3) {
      throw new BadRequestError('Blog description must be longer than 3 characters');
    }

    const validOwner = User(owner);

    return Object.freeze({
      getId: () => id,
      getName: () => name,
      getDescription: () => description,
      getOwner: () => validOwner,
      getCreatedOn: () => createdOn,
      getModifiedOn: () => modifiedOn,
    });
  };
}
