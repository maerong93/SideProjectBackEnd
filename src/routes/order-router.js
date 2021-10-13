const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const OrderController = require('../controllers/order-controller');


router.post('/', auth.authGet, OrderController.addOrder);

module.exports = router;