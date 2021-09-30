const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const ItemController = require('../controllers/item-controller');
const commonLib = require('../util/common.lib');

router.get('/list', auth.authGet, ItemController.getItemList);
router.post('/', auth.authGet 
               , commonLib.fileUpload('/item').fields([{name : 'it_main_img'}])
               , commonLib.fileUploadCheck([{name : 'it_main_img', required : false}])
               , ItemController.addItem
            );




module.exports = router;