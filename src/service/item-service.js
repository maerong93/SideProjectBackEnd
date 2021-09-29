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
    }
}