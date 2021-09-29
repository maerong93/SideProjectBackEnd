const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user-controller');
const auth = require('../middlewares/auth');
const validator = require('../middlewares/user-validator');

router.post('/login', UserController.loginUser);
router.post('/register', validator.register.conditional(), validator.register.func , UserController.register);
router.post('/info', auth.auth, UserController.getUser);



module.exports = router;