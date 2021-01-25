const mongoose = require('mongoose');
const Post = require('../models/post-model.js');
const Blog = require('../models/blog-model.js');
const User = require('../models/user-model.js');

const updateUserPostVotes = async (userId) => {
  const user = await User.findById(userId);
  const [{ total }] = await Post
    .aggregate()
    .match({ 'author.id': mongoose.Types.ObjectId(userId) })
    .group({ _id: null, total: { $sum: '$votes' } })
    .exec();
  user.votedPosts = total;
  user.save();
};

module.exports = {
  getPosts: async (req, res) => {
    try {
      const { blogId } = req.params;
      const posts = await Post
        .find({ 'blog.id': blogId })
        .limit(10)
        .exec();
      res.json(posts);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  createPost: async (req, res) => {
    const { _id: userId, username } = req.user;
    const { title, body, type } = req.body;
    const { blogId } = req.params;
    try {
      const blog = await Blog
        .findById(blogId)
        .exec();
      if (blog) {
        const post = await Post.create({
          title,
          body,
          type,
          'author.id': userId,
          'author.name': username,
          'blog.id': blog.id,
          'blog.name': blog.name,
        });
        return res.status(201).json(post);
      }
      return res.status(404).send();
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  editPost: async (req, res) => {
    const { _id: userId } = req.user;
    const { title, body, type } = req.body;
    const { blogId, postId } = req.params;
    try {
      const post = await Post.findOne({
        _id: postId,
        'blog.id': blogId,
      }).exec();
      if (post) {
        if (post.author.id.toString() !== userId.toString()) {
          return res.status(401).send();
        }
        if (title) {
          post.title = title;
        }
        if (body) {
          post.body = body;
        }
        if (type) {
          post.type = type;
        }
        const updatedPost = await post.save();
        return res.status(201).json(updatedPost);
      }
      return res.status(404).send();
    } catch (err) {
      return res.status(500).json(err);
    }
  },

  deletePost: async (req, res) => {
    const { _id: userId } = req.user;
    const { blogId, postId } = req.params;
    try {
      const post = await Post.findOne({
        _id: postId,
        'blog.id': blogId,
      }).exec();
      if (post) {
        if (post.author.id.toString() !== userId.toString()) {
          return res.status(401).send();
        }
        post.body = '';
        post.deleted = true;
        await post.save();
        return res.status(204).send();
      }
      return res.status(404).send();
    } catch (err) {
      return res.status(500).json(err);
    }
  },

  upVotePost: async (req, res) => {
    const { _id: userId } = req.user;
    const { blogId, postId } = req.params;

    try {
      const post = await Post.findOne({
        _id: postId,
        'blog.id': blogId,
      }).exec();
      if (post) {
        if (post.author.id.toString() !== userId.toString()) {
          return res.status(401).send();
        }

        if (!post.upVotes.includes(userId)) {
          post.upVotes.push(userId);
          post.downVotes = post.downVotes.filter(
            (voterId) => voterId.toString() !== userId.toString(),
          );
        } else {
          post.upVotes = post.upVotes.filter(
            (voterId) => voterId.toString() !== userId.toString(),
          );
        }
        post.votes = post.upVotes.length - post.downVotes.length;
        const updatedPost = await post.save();

        updateUserPostVotes(post.author.id);

        return res.status(200).json(updatedPost);
      }
      return res.status(404).send();
    } catch (err) {
      return res.status(500).json(err);
    }
  },

  downVotePost: async (req, res) => {
    const { _id: userId } = req.user;
    const { blogId, postId } = req.params;

    try {
      const post = await Post.findOne({
        _id: postId,
        'blog.id': blogId,
      }).exec();
      if (post) {
        if (post.author.id.toString() !== userId.toString()) {
          return res.status(401).send();
        }

        if (!post.downVotes.includes(userId)) {
          post.downVotes.push(userId);
          post.upVotes = post.upVotes.filter(
            (voterId) => voterId.toString() !== userId.toString(),
          );
        } else {
          post.downVotes = post.downVotes.filter(
            (voterId) => voterId.toString() !== userId.toString(),
          );
        }
        post.votes = post.upVotes.length - post.downVotes.length;
        const updatedPost = await post.save();

        updateUserPostVotes(post.author.id);

        return res.status(200).json(updatedPost);
      }
      return res.status(404).send();
    } catch (err) {
      return res.status(500).json(err);
    }
  },

  savePost: async (req, res) => {
    const { _id: userId } = req.user;
    const { blogId, postId } = req.params;

    try {
      const post = await Post.findOne({
        _id: postId,
        'blog.id': blogId,
      }).exec();
      if (post) {
        const user = await User.findById(userId);
        if (!user.savedPosts.includes(postId)) {
          user.savedPosts.push(postId);
        } else {
          user.savedPosts = user.savedPosts.filter(
            (savedPostId) => savedPostId.toString() !== postId.toString(),
          );
        }
        user.save();
        return res.status(201).send();
      }
      return res.status(404).send();
    } catch (err) {
      return res.status(500).json(err);
    }
  },

  getSavedPosts: async (req, res) => {
    const { savedPosts } = req.user;
    try {
      const blogs = await Post.find({ _id: { $in: savedPosts } }).exec();
      res.json(blogs);
    } catch (err) {
      res.status(500).json(err);
    }
  },

};
