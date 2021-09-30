const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const ItemController = require('../controllers/item-controller');
const commonLib = require('../util/common.lib');

router.get('/list', auth.authGet, ItemController.getItemList);
router.get('/:it_id', auth.authGet, ItemController.getItem);

router.post('/', auth.authGet 
               , commonLib.fileUpload('/item').fields([{name : 'it_main_img'}])
               , commonLib.fileUploadCheck([{name : 'it_main_img', required : false}])
               , ItemController.addItem
            );
router.put('/', auth.authGet
               , commonLib.fileUpload('/item').fields([{name : 'it_main_img'}])
               , commonLib.fileUploadCheck([{name : 'it_main_img', required : false}])
               , ItemController.updateItem
            );





module.exports = router;