const errToJson = require('error-to-json').default;
const commonLib = require('../util/common.lib');
const config = require('../config/config');
const cartService = require('../service/cart-service');
const itemService = require('../service/item-service');
const userService = require('../service/user-service');


module.exports = {
    addCart : async (req, res, next) => {
        let it_id = '';
        let mb_name = '';
        let it_name = '';
        let it_price = '';
        let ct_cnt = '';
        let mb_id = '';
        let ca_datetime = commonLib.getDate.dateTime;
        let in_datetime = commonLib.getDate.dateTime;
        console.log('it_id', req.body);
        try {
            it_id = req.body.it_id;
            ct_cnt = req.body.ct_cnt;
            mb_id = req.session.mb_id;
            
            let rows = await itemService.getItem(it_id); 
            console.log('rows[0]', rows[0]);
            if(rows.length > 0){
                it_name = rows[0].it_name;
                it_price = rows[0].it_price;
                if(rows[0].it_use === 'N') { // 사용여부가 아니라면
                    return res.json({ status: "success", msg : "미 사용처리된 상품 입니다.", data : []});
                }
                if(rows[0].it_cnt <= 0 ){ // 상품 수량 체크
                    return res.json({ status: "success", msg : "상품 재고가 없음", data : []});
                }
                let rows2 = await userService.getUser2(req.session.mb_id); 
                mb_name = rows2[0].mb_name;

                let result =  await cartService.addCart(it_id, it_name, it_price, ct_cnt, 
                                                        mb_id, mb_name, ca_datetime, in_datetime);

                if(result.insertId > 0){
                    return res.json({ status: "success", msg : "저장됨", data : [{'insertId' : result.insertId}]});
                }
                return res.status(500).json({ status: "error", msg : "저장 실패", data : []});
            }else{ // 데이터가 없다면
                return res.json({ status: "success", msg : "등록된 상품 없음", data : [rows]});
            }
        } catch (error) {
            return res.status(500).json(errToJson(error));
        }
    }
}
