/**
 * DB 연결 및 pool 처리
 */
const mysql = require('mysql2')
const dbConfig = require('../config/db_config');
const poll = mysql.createPool(
    dbConfig
);
const promisePool = poll.promise();
module.exports = promisePool;