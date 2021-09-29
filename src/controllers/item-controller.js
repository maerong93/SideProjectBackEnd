const itemService = require('../service/item-service');
const errToJson = require('error-to-json').default;
const commonLib = require('../util/common.lib');;
const config = require('../config/config');

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
        
    }
}