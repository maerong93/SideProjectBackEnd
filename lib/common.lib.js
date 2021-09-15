const mysql = require('mysql2/promise');
const mysql2Pool = require('./mysql2Pool');
require('dotenv').config();

let exportsModuls = {};

const getMember = async (mb_id) => {
    const [rows, fields] = await mysql2Pool.execute(" SELECT * FROM member WHERE mb_id = ? LIMIT 1 ", [mb_id]);
    return rows[0];
}



module.exports = {
    getMember
}



