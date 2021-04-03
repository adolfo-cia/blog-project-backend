import IdService from './services/IdService';
import CryptoService from './services/CryptoService';
import buildUser from './user';
import buildBlog from './blog';
import buildPost from './post';
import buildComment from './comment';

const User = buildUser(IdService, CryptoService);
const Blog = buildBlog(IdService, User);
const Post = buildPost(IdService, User, Blog);
const Comment = buildComment(IdService, User, Post);

export {
  User, Blog, Post, Comment,
};
