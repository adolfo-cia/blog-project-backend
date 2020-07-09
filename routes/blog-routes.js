const passport = require('passport');
const router = require('express').Router();
const { getBlogs, createBlog, editBlog } = require('../controllers/blog-controllers.js');

router.get('/blogs', getBlogs);
router.post('/blogs', passport.authenticate('jwt', { session: false }), createBlog);
router.put('/blogs/:blogId', passport.authenticate('jwt', { session: false }), editBlog);

module.exports = router;
