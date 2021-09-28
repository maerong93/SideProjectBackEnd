const pool = require('../database/pool');
const userQuery = require('../queries/user-query');

module.exports = {
    getUser : async (mb_id, mb_password) => {
        try {
            let result = await pool.queryParams(userQuery.getUser, [mb_id, mb_password]);
            let rows = pool.textRowDel(result); 
            return rows;
        } catch (e) {
            console.log(e);
            throw new Error(e);
        }
    },
    getUser2 : async (mb_id) => {
        try {
            let result = await pool.queryParams(userQuery.getUser2, [mb_id]);
            let rows = pool.textRowDel(result);
            return rows;
        } catch (error) {
            console.log(error);
            throw new Error(error);
        }
    }
}
