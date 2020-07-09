const passport = require('passport');
const router = require('express').Router();
const { getMyBlogs, getSubscribedBlogs } = require('../controllers/blog-controllers.js');

router.get('/myblogs', passport.authenticate('jwt', { session: false }), getMyBlogs);
router.get('/mysubscribed', passport.authenticate('jwt', { session: false }), getSubscribedBlogs);

module.exports = router;
