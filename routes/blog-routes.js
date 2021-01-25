const passport = require('passport');
const router = require('express').Router();
const {
  getBlogs, createBlog, editBlog, subscribe,
} = require('../controllers/blog-controllers.js');

router.get('/blogs', getBlogs);
router.post('/blogs', passport.authenticate('jwt', { session: false }), createBlog);
router.put('/blogs/:blogId', passport.authenticate('jwt', { session: false }), editBlog);
router.post('/blogs/:blogId/subscribe', passport.authenticate('jwt', { session: false }), subscribe);

module.exports = router;
