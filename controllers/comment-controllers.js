const moment = require('moment');
const mongoose = require('mongoose');
const Comment = require('../models/comment-model.js');
const Post = require('../models/post-model.js');
const User = require('../models/user-model.js');

function generateSlug() {
  let slug = '';
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < 4; i += 1) {
    slug += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return slug;
}

const updateUserCommentVotes = async (userId) => {
  const user = await User.findById(userId);
  const [{ total }] = await Comment
    .aggregate()
    .match({ 'author.id': mongoose.Types.ObjectId(userId) })
    .group({ _id: null, total: { $sum: '$votes' } })
    .exec();
  user.votedComments = total;
  user.save();
};

module.exports = {

  getComment: async (req, res) => {
    try {
      const { commentId } = req.params;
      const comment = await Comment
        .findById(commentId)
        .exec();
      if (comment) {
        return res.json(comment);
      }
      return res.status(404).send();
    } catch (err) {
      return res.status(500).json(err);
    }
  },

  createComment: async (req, res) => {
    const { _id: userId, username } = req.user;
    const { postId, body } = req.body;
    try {
      const post = await Post
        .findById(postId)
        .exec();
      if (post) {
        const timestamp = moment().format('YYYY.MM.DD.hh.mm.ss');
        const slug = generateSlug();
        const fullSlug = `${timestamp}:${slug}`;
        const comment = await Comment.create({
          body,
          'author.id': userId,
          'author.name': username,
          'post.id': post.id,
          'post.title': post.title,
          slug,
          fullSlug,
        });
        return res.status(201).json(comment);
      }
      return res.status(404).send();
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  replyComment: async (req, res) => {
    try {
      const { _id: userId, username } = req.user;
      const { body } = req.body;
      const { commentId } = req.params;
      const parentComment = await Comment.findById(commentId).exec();
      if (!parentComment) {
        return res.status(404).send();
      }
      const timestamp = moment().format('YYYY.MM.DD.hh.mm.ss');
      const slug = generateSlug();
      const fullSlug = `${timestamp}:${slug}`;
      const comment = await Comment.create({
        body,
        'author.id': userId,
        'author.name': username,
        'post.id': parentComment.post.id,
        'post.title': parentComment.post.title,
        slug: `${parentComment.slug}/${slug}`,
        fullSlug: `${parentComment.fullSlug}/${fullSlug}`,
        level: parentComment.level + 1,
        parentId: parentComment._id,
      });
      return res.status(201).json(comment);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  editComment: async (req, res) => {
    const { _id: userId } = req.user;
    const { body } = req.body;
    const { commentId } = req.params;
    try {
      const comment = await Comment.findById(commentId).exec();
      if (comment) {
        if (comment.author.id.toString() !== userId.toString()) {
          return res.status(401).send();
        }
        if (body) {
          comment.body = body;
        }
        const updatedComment = await comment.save();
        return res.status(201).json(updatedComment);
      }
      return res.status(404).send();
    } catch (err) {
      return res.status(500).json(err);
    }
  },

  deleteComment: async (req, res) => {
    const { _id: userId } = req.user;
    const { commentId } = req.params;
    try {
      const comment = await Comment.findById(commentId).exec();
      if (comment) {
        if (comment.author.id.toString() !== userId.toString()) {
          return res.status(401).send();
        }
        comment.body = '';
        comment.deleted = true;
        await comment.save();
        return res.status(204).send();
      }
      return res.status(404).send();
    } catch (err) {
      return res.status(500).json(err);
    }
  },

  upVoteComment: async (req, res) => {
    const { _id: userId } = req.user;
    const { commentId } = req.params;

    try {
      const comment = await Comment.findById(commentId).exec();
      if (comment) {
        if (comment.author.id.toString() !== userId.toString()) {
          return res.status(401).send();
        }

        if (!comment.upVotes.includes(userId)) {
          comment.upVotes.push(userId);
          comment.downVotes = comment.downVotes.filter(
            (voterId) => voterId.toString() !== userId.toString(),
          );
        } else {
          comment.upVotes = comment.upVotes.filter(
            (voterId) => voterId.toString() !== userId.toString(),
          );
        }
        comment.votes = comment.upVotes.length - comment.downVotes.length;
        const updatedComment = await comment.save();

        updateUserCommentVotes(comment.author.id);

        return res.status(200).json(updatedComment);
      }
      return res.status(404).send();
    } catch (err) {
      return res.status(500).json(err);
    }
  },

  downVoteComment: async (req, res) => {
    const { _id: userId } = req.user;
    const { commentId } = req.params;

    try {
      const comment = await Comment.findById(commentId).exec();
      if (comment) {
        if (comment.author.id.toString() !== userId.toString()) {
          return res.status(401).send();
        }

        if (!comment.downVotes.includes(userId)) {
          comment.downVotes.push(userId);
          comment.upVotes = comment.upVotes.filter(
            (voterId) => voterId.toString() !== userId.toString(),
          );
        } else {
          comment.downVotes = comment.downVotes.filter(
            (voterId) => voterId.toString() !== userId.toString(),
          );
        }
        comment.votes = comment.upVotes.length - comment.downVotes.length;
        const updatedComment = await comment.save();

        updateUserCommentVotes(comment.author.id);

        return res.status(200).json(updatedComment);
      }
      return res.status(404).send();
    } catch (err) {
      return res.status(500).json(err);
    }
  },

  saveComment: async (req, res) => {
    const { _id: userId } = req.user;
    const { commentId } = req.params;

    try {
      const comment = await Comment.findById(commentId).exec();
      if (comment) {
        const user = await User.findById(userId);
        if (!user.savedComments.includes(commentId)) {
          user.savedComments.push(commentId);
        } else {
          user.savedComments = user.savedComments.filter(
            (savedcommentId) => savedcommentId.toString() !== commentId.toString(),
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

  getSavedComments: async (req, res) => {
    const { savedComments } = req.user;
    try {
      const comments = await Comment.find({ _id: { $in: savedComments } }).exec();
      res.json(comments);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
