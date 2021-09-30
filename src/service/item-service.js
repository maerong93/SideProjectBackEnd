const pool = require('../database/pool');
const itemQuery = require('../queries/item-query');

module.exports = {
    getItemList : async () => {
        try {
            let result =  await pool.query(itemQuery.getItemList);    
            let rows = pool.textRowDel(result);
            return rows;
        } catch (error) {
            console.log(error);
            throw new Error(error);
        }
    },
    addItem : async (
        it_name , it_cnt, it_info , it_price ,
        it_use  , it_main_img     , mb_id    , mb_name,
        in_datetime
    ) => {
        try {
            let result = await pool.queryParams(itemQuery.addItem, [
                it_name , it_cnt, it_info , it_price ,
                it_use  , it_main_img     , mb_id    , mb_name,
                in_datetime
            ]);
            return result;
        } catch (error) {
            console.log(error);
            throw new Error(error);
        }
    },
    updateItem : async (
         it_name , it_cnt, it_info , it_price ,
         it_use  , it_main_img     , mb_id  , mb_name ,
        up_datetime , it_id
    ) => {
        try {
            let result = await pool.queryParams(itemQuery.updateItem, [
                it_name , it_cnt       , it_info , it_price ,
                it_use  , it_main_img  , mb_id   , mb_name ,
                up_datetime , it_id
            ]);
            return result;
        } catch (error) {
            console.log(error);
            throw new Error(error);
        }
    }
}