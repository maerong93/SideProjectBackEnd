/**
 * DB pool connection 처리 
 * 
 */
const poolPromise = require('./db_config');


module.exports = {
    query : async (query) => {
        const conn = await poolPromise.getConnection(); // 컨넥션 받음
        try{
            const [row] = await conn.query(query);
            return row;
        }catch(e){
            console.log(e);
            throw new Error(e); // 에러 throw
        }finally{
            conn.release(); // poll을 돌려주는 역할함
        }
    },

    queryParams : async (query, values) => {
        const conn = await poolPromise.getConnection();
        try {
            const [row] = await conn.query(query, values);
            return row;
        } catch (e) {
            throw new Error(e); // 에러 throw
        }finally{
            conn.release();
        }
    },

    textRowDel : (rows) => {
        try {
            const jsonRows = Object.values(JSON.parse(JSON.stringify(rows)));    
            return jsonRows;
        } catch (error) {
            throw new Error(e); //에러 throw
        }
    }
}
 
