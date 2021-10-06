const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const commonLib = require('../util/common.lib');
const cartController = require('../controllers/cart-controller');

router.get('/', auth.authGet, cartController.getCartList);
router.post('/', auth.authGet ,cartController.addCart);
router.put('/', auth.authGet, cartController.updateCart);


module.exports = router;