/**
 * DB 연결 및 pool 처리
 */
const mysql = require('mysql2')
const dbConfig = require('../config/db_config');
console.log(dbConfig);
const pool = mysql.createPool(
    dbConfig
);

const getConnection = pool.promise()
module.exports = getConnection;