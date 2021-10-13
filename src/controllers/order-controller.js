
const CartService = require('../service/cart-service');
const UserService = require('../service/user-service');
const OrderService = require('../service/order-service');
const errToJson = require('error-to-json').default;
const commonLib = require('../util/common.lib');
const mysqlUtil = require('../database/utile');

module.exports = {
    addOrder: async (req, res, next) => {
        let ct_id_arr =  [];
        let temp_ct_id_String =  '';
        let od_addr1 = '';
        let od_addr2 = '';
        let od_tel = '';
        let od_hp = '';
        let od_email = '';
        let od_price = 0;
        let datetime = commonLib.getDate.dateTime;
        console.log(req.body);
        try {
            let mbinfo = await UserService.getUser2(req.session.mb_id);
            console.log('mbinfo', mbinfo);
            ct_id_arr =  req.body.ct_id;
            od_addr1 = req.body.od_addr1 === undefined ? mbinfo[0].mb_addr1 : req.body.od_addr1;
            od_addr2 = req.body.od_addr2 === undefined ? mbinfo[0].mb_addr2 : req.body.od_addr2;
            od_tel = req.body.od_tel === undefined ? mbinfo[0].mb_tel : req.body.od_tel;
            od_hp = req.body.od_hp === undefined ? mbinfo[0].mb_phone : req.body.od_hp;
            od_email = req.body.od_email === undefined ? mbinfo[0].mb_email : req.body.od_email;
            if(ct_id_arr.length > 0){
                let result =  await OrderService.tranOrder(ct_id_arr, od_addr2, od_addr2, od_tel, 
                                            od_hp, od_email, datetime, 1000, 
                                            datetime, mbinfo[0] );
                return res.json({status: 'success', msg : '주문 성공', data: [{'주문아이디': result}]});
            }else{
                return res.status(500).json({status: 'error', msg : '장바구니 번호 없어'});
            }
        } catch (error) {
            return res.status(500).json(errToJson(error));
        }
        return res.json({status: 'error', msg : '메롱2'});


    }
}