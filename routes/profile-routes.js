const passport = require('passport');
const router = require('express').Router();
const { getMyBlogs, getSubscribedBlogs } = require('../controllers/blog-controllers.js');
const { getSavedPosts } = require('../controllers/post-controllers.js');
const { getSavedComments } = require('../controllers/comment-controllers.js');
const { getMyProfile } = require('../controllers/profile-controllers.js');

router.get('/profile', passport.authenticate('jwt', { session: false }), getMyProfile);
router.get('/profile/myblogs', passport.authenticate('jwt', { session: false }), getMyBlogs);
router.get('/profile/mysubscribed', passport.authenticate('jwt', { session: false }), getSubscribedBlogs);
router.get('/profile/savedposts', passport.authenticate('jwt', { session: false }), getSavedPosts);
router.get('/profile/savedcomments', passport.authenticate('jwt', { session: false }), getSavedComments);

module.exports = router;
