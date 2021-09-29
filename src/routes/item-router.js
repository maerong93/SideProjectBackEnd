const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const ItemController = require('../controllers/item-controller');

router.get('/', auth.authGet, ItemController.getItemList);




module.exports = router;