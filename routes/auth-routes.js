const passport = require('passport');
const router = require('express').Router();
const { registerController, loginController, googleRedirectController } = require('../controllers/auth-controllers.js');

router.post('/register', registerController);
router.get('/google', passport.authenticate('google', { scope: ['profile'], session: false }));
router.get('/google/redirect', passport.authenticate('google', { session: false }), googleRedirectController);
router.post('/login', loginController);

module.exports = router;
