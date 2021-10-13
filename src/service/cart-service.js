const pool = require('../database/pool');
const cartQuery = require('../queries/cart-query');
const mysqlUtil = require('../database/utile');

module.exports = {
    getCartList : async (mb_id) => { // 회원의 장바구니 리스트
        try {
            let result = await pool.queryParams(cartQuery.getCartList, [mb_id]);
            return result;
        } catch (error) {
            console.log(error);
            throw new Error(error);
        }
    },
    getCartList2 : async (ct_id_arr) => { // 지정된 회원 장바구니 리스트
        try {
            let result = await pool.queryParams(cartQuery.getCartList2, [ct_id_arr]);
            return result;
        } catch (error) {
            console.log(error);
            throw new Error(error);
        }
    },
    addCart : async (
                        it_id, it_name, it_price, ct_cnt, 
                        mb_id, mb_name, ct_datetime, in_datetime
                    ) => { // 장바구니 추가
        try {
            let result = await pool.queryParams(cartQuery.addCart, [
                                                                        it_id, it_name, it_price, ct_cnt, 
                                                                        mb_id, mb_name, ct_datetime, in_datetime
                                                                    ]);
            return result;
        } catch (error) {
            console.log(error);
            throw new Error(error);
        }
    },
    updateCart : async ( ct_cnt , up_datetime, ct_id, it_id ) => { // 장바구니 수정
        try {
            let result = await pool.queryParams(cartQuery.updateCart, [ ct_cnt , up_datetime, ct_id, it_id ]);
            return result;
        } catch (error) {
            console.log(error);
            throw new Error(error);
        }
    },
    delCart : async (ct_id) => { // 장바구니 삭제
        try {
            let result = await pool.queryParams(cartQuery.delCart, [ct_id]);
            return result;
        } catch (error) {
            console.log(error);
            throw new Error(error);
        }
    },
    updateCartOder: async (od_id, ct_id_arr) => { // 주문되지 않은 장바구니 개수  
        try {
            let result = await pool.queryParams(cartQuery.updateCartOder, [od_id, ct_id_arr]);
            return result;
        } catch (error) {
            console.log(error);
            throw new Error(error);
        }
    }
}