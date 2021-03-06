const mysql = require('mysql2/promise');
const mysql2Pool = require('../lib/mysql2Pool');
const commonModule = require('../routes/api/common/module'); // require사용시 expor
require('dotenv').config();

let exportsModuls = {};

// 등록된 회원인지 체크 
// prams : 
//          mb_id (회원아이디)
//          mb_password (회원비번)
const checkMember = async (mb_id, mb_password) => {
    const [rows, fields] = await mysql2Pool.execute(" SELECT COUNT(id) AS cnt FROM member WHERE mb_id = ? AND mb_password = ? LIMIT 1 ", [mb_id, mb_password]);
    return rows[0];
}

// 등록된 회원인지 체크2
// prams : 
//          mb_id (회원아이디)
const checkMember2 = async (mb_id) => {
    const [rows, fields] = await mysql2Pool.execute(" SELECT COUNT(id) AS cnt FROM member WHERE mb_id = ? LIMIT 1 ", [mb_id]);
    return rows[0];
}

const checkMember4 = async (req, res, next) => {
    const mb_id = req.param('mb_id');
    const password = req.param('password');
    const [rows, fields] = await mysql2Pool.execute(" SELECT COUNT(id) AS cnt FROM member WHERE mb_id = ? AND mb_password = ? LIMIT 1 ", [mb_id, password]);
    if (rows[0]) {
        res.status(400).json({"hello" : "hello1"});
    } else {
        res.status(400).json({"hello" : "hello"});
    }
}

// 회원 정보
// prams : 
//          mb_id (회원아이디)
const getUserInfo = async (mb_id) => {
    const [rows, fields] = await mysql2Pool.execute(" SELECT * FROM member WHERE mb_id = ? LIMIT 1 ", [mb_id]);
    return rows[0];
}



module.exports = {
    checkMember,
    checkMember2,
    getUserInfo,
    checkMember4
}