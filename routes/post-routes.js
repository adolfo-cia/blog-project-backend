const passport = require('passport');
const router = require('express').Router();
const {
  getPosts, createPost, editPost, deletePost, upVotePost, downVotePost,
} = require('../controllers/post-controllers.js');

router.get('/blogs/:blogId/posts', getPosts);
router.post('/blogs/:blogId/posts', passport.authenticate('jwt', { session: false }), createPost);
router.put('/blogs/:blogId/posts/:postId', passport.authenticate('jwt', { session: false }), editPost);
router.delete('/blogs/:blogId/posts/:postId', passport.authenticate('jwt', { session: false }), deletePost);

router.post('/blogs/:blogId/posts/:postId/upVote', passport.authenticate('jwt', { session: false }), upVotePost);
router.post('/blogs/:blogId/posts/:postId/downVote', passport.authenticate('jwt', { session: false }), downVotePost);

module.exports = router;
