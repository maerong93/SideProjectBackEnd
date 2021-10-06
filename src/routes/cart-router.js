const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const commonLib = require('../util/common.lib');
const cartService = require('../controllers/cart-controller');

//router.get('/')
router.post('/', auth.authGet ,cartService.addCart);


module.exports = router;