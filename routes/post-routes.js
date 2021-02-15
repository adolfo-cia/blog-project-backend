const passport = require('passport');
const router = require('express').Router();
const {
  getPost, createPost, editPost, deletePost,
  upVotePost, downVotePost, savePost,
  getComments,
} = require('../controllers/post-controllers.js');

router.get('/posts/:postId', getPost);
router.post('/posts', passport.authenticate('jwt', { session: false }), createPost);
router.put('/posts/:postId', passport.authenticate('jwt', { session: false }), editPost);
router.delete('/posts/:postId', passport.authenticate('jwt', { session: false }), deletePost);

router.post('/posts/:postId/upVote', passport.authenticate('jwt', { session: false }), upVotePost);
router.post('/posts/:postId/downVote', passport.authenticate('jwt', { session: false }), downVotePost);
router.post('/posts/:postId/save', passport.authenticate('jwt', { session: false }), savePost);
router.get('/posts/:postId/comments', getComments);

module.exports = router;
