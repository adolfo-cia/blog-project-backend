import BadRequestError from '../exception/BadRequestError';

export default function buildPost(IdService, User, Blog) {
  return function Post({
    id = IdService.makeId(),
    title,
    body,
    type,
    author,
    blog,
    votes,
    upVotes,
    downVotes,
    deleted = false,
    createdOn = Date.now(),
    modifiedOn = Date.now(),
  }) {
    if (!IdService.isValid(id)) {
      throw new BadRequestError('User must have a valid Id.');
    }
    if (!title) {
      throw new BadRequestError('Post must have a title.');
    }
    if (title.length < 3) {
      throw new BadRequestError('Post title must be longer than 3 characters');
    }
    if (!body) {
      throw new BadRequestError('Post must have a body.');
    }
    if (body.length < 3) {
      throw new BadRequestError('Post body must be longer than 3 characters');
    }

    const validAuthor = User(author);
    const validBlog = Blog(blog);

    return Object.freeze({
      getId: () => id,
      getTitle: () => title,
      getBody: () => body,
      getType: () => type,
      getAuthor: () => validAuthor,
      getBlog: () => validBlog,
      getVotes: () => votes,
      getUpVotes: () => upVotes,
      getDownVotes: () => downVotes,
      isDeleted: () => deleted,
      markDeleted: () => { deleted = true; },
      getCreatedOn: () => createdOn,
      getModifiedOn: () => modifiedOn,
    });
  };
}
