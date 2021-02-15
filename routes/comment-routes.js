const passport = require('passport');
const router = require('express').Router();
const {
  getComment, createComment, editComment, deleteComment,
  upVoteComment, downVoteComment, saveComment, replyComment,
} = require('../controllers/comment-controllers.js');

router.get('/comments/:commentId', getComment);
router.post('/comments', passport.authenticate('jwt', { session: false }), createComment);
router.put('/comments/:commentId', passport.authenticate('jwt', { session: false }), editComment);
router.delete('/comments/:commenttId', passport.authenticate('jwt', { session: false }), deleteComment);
router.post('/comments/:commentId/reply', passport.authenticate('jwt', { session: false }), replyComment);

router.post('/comments/:commentId/upVote', passport.authenticate('jwt', { session: false }), upVoteComment);
router.post('/comments/:commentId/downVote', passport.authenticate('jwt', { session: false }), downVoteComment);
router.post('/comments/:commentId/save', passport.authenticate('jwt', { session: false }), saveComment);

module.exports = router;
