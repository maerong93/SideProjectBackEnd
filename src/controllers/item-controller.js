const itemService = require('../service/item-service');
const errToJson = require('error-to-json').default;
const commonLib = require('../util/common.lib');;
const config = require('../config/config');
const multer = require('multer');
const userService = require('../service/user-service')


module.exports = {
    getItemList : async (req, res, next) => {
        try {
            let rows = await itemService.getItemList();
            if(rows.length > 0){
                let data = JSON.stringify(rows , (key, value) => { 
                    return key === 'it_main_img' ? config.fileUrl.item+'/'+value : value;
                });
                data = JSON.parse(data)
                return res.json({ status: "success", msg : "상품 목록", data : data});
            }else{
                return res.json({ status: "success", msg : "등록된 상품 없음", data : [rows]});
            }
        } catch (error) {
            return res.status(500).json(errToJson(error));
        }
        
    },
    addItem : async (req, res, next) => {
        let it_name = req.body.it_name;
        let it_cnt = req.body.it_cnt;
        let it_info = req.body.it_info;
        let it_price = req.body.it_price;
        console.log(req.files);

        let it_use = req.body.it_use;
        let it_hit = req.body.it_hit;
        console.log('controll : ', req.files);
        let it_main_img = '';
        
        try {
            it_main_img = req.files.it_main_img[0].filename;    
        } catch (error) {
            console.log(error);
            it_main_img = '';
        }
        
        let mb_id = '';
        let mb_name = '';
        try {
            mb_id = req.session.mb_id;
            mb_name = await userService.getUser2(mb_id);    
        } catch (error) {
            return res.status(500).json(errToJson(error));
        }
        let in_datetime = commonLib.getDate.dateTime;

        try {
            let result = await itemService.addItem(
                it_name , it_cnt, it_info, it_price, 
                it_use  , it_main_img, mb_id , mb_name 
                , in_datetime
            );       
            
            if(result.insertId > 0){
                return res.json({ status: "success", msg : "저장됨", data : [{'insertId' : result.insertId}]});
            }
            return res.status(500).json({ status: "error", msg : "저장 실패", data : []});
        } catch (error) {
            return res.status(500).json(errToJson(error));
        }
    }
}