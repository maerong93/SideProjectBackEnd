const pool = require('../database/pool');
const cartQuery = require('../queries/cart-query');

module.exports = {
    getCartList : async (mb_id) => {
        try {
            let result = await pool.queryParams(cartQuery.getCartList, [mb_id]);
            return result;
        } catch (error) {
            console.log(error);
            throw new Error(error);
        }
    },
    addCart : async (
                        it_id, it_name, it_price, ct_cnt, 
                        mb_id, mb_name, ct_datetime, in_datetime
                    ) => {
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
    updateCart : async ( ct_cnt , up_datetime, ct_id, it_id ) => {
        try {
            let result = await pool.queryParams(cartQuery.updateCart, [ ct_cnt , up_datetime, ct_id, it_id ]);
            return result;
        } catch (error) {
            console.log(error);
            throw new Error(error);
        }
    },
    delCart : async (ct_id) => {
        try {
            let result = await pool.queryParams(cartQuery.delCart, [ct_id]);
            return result;
        } catch (error) {
            console.log(error);
            throw new Error(error);
        }
    }
}