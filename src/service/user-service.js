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
    },
    register : async (mb_id, mb_password, mb_name, mb_level, mb_sex, mb_email, mb_tel,mb_phone,mb_addr1,mb_addr2,mb_ip,in_datetime) => {
            try {
                let values = [mb_id , mb_password , mb_name , mb_level , mb_sex , mb_email , mb_tel ,mb_phone ,mb_addr1 ,mb_addr2 , mb_ip , in_datetime];
                let result =  await pool.queryParams(userQuery.register, values);
                return result;
            } catch (error) {
                console.log(error);
                throw new Error(error);
            }
        }
}
