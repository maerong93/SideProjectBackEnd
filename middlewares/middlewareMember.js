const mysql = require('mysql2/promise');
const mysql2Pool = require('../lib/mysql2Pool');
require('dotenv').config();

let exportsModuls = {};

const checkMember = async (mb_id, mb_password) => {
    const [rows, fields] = await mysql2Pool.execute(" SELECT COUNT(id) AS cnt FROM member WHERE mb_id = ? AND mb_password = ? LIMIT 1 ", [mb_id, mb_password]);
    return rows[0];
}

module.exports = {
    checkMember
}