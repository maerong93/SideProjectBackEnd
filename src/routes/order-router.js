const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const OrderController = require('../controllers/order-controller');

router.get('/', auth.authGet, OrderController.orderList );
router.post('/', auth.authGet, OrderController.addOrder);

module.exports = router;