import BadRequestError from '../exception/BadRequestError';

export default function buildComment(IdService, User, Post) {
  return function Comment({
    id = IdService.makeId(),
    body,
    author,
    post,
    votes,
    upVotes,
    downVotes,
    deleted = false,
    parentId,
    slug,
    fullSlug,
    level = 1,
    createdOn = Date.now(),
    modifiedOn = Date.now(),
  }) {
    if (!IdService.isValid(id)) {
      throw new BadRequestError('Comment must have a valid Id.');
    }
    if (!body) {
      throw new BadRequestError('Post must have a body.');
    }
    if (body.length < 3) {
      throw new BadRequestError('Post body must be longer than 3 characters');
    }

    const validAuthor = User(author);
    const validPost = Post(post);

    return Object.freeze({
      getId: () => id,
      getBody: () => body,
      getAuthor: () => validAuthor,
      getPost: () => validPost,
      getVotes: () => votes,
      getUpVotes: () => upVotes,
      getDownVotes: () => downVotes,
      isDeleted: () => deleted,
      markDeleted: () => { deleted = true; },
      getParentId: () => parentId,
      getSlug: () => slug,
      getFullSlug: () => fullSlug,
      getLevel: () => level,
      getCreatedOn: () => createdOn,
      getModifiedOn: () => modifiedOn,
    });
  };
}
