/*
    DB 연결 필요한 설정값
*/
const bluebird = require('bluebird');
require('dotenv').config();
module.exports = (() => {
    return {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        connectionLimit: 30,
        Promise: bluebird,
    }
})(); // 즉시 실행 함수