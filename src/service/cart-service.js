const pool = require('../database/pool');
const cartQuery = require('../queries/cart-query');

module.exports = {
    addCart : async (
                        it_id, it_name, it_price, ct_cnt, 
                        mb_id, mb_name, ca_datetime, in_datetime
                    ) => {
        try {
            let result = await pool.queryParams(cartQuery.addCart, [
                                                                        it_id, it_name, it_price, ct_cnt, 
                                                                        mb_id, mb_name, ca_datetime, in_datetime
                                                                    ]);
            return result;
        } catch (error) {
            console.log(error);
            throw new Error(error);
        }
    }
}