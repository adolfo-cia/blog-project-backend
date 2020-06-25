const router = require('express').Router();
const { registerController, loginController } = require('../controllers/auth-controllers.js');

router.post('/register', registerController);
router.post('/login', loginController);

module.exports = router;
