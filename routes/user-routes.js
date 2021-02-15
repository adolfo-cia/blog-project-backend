const router = require('express').Router();
const { getUser } = require('../controllers/user-controllers');

router.get('/users/:username', getUser);

module.exports = router;
