/**
 * DB 연결 설정 처리 
 */
const mysql = require('mysql2/promise');

const dbConfig = {
    host: '192.168.26.134',
    port: '3306',
    user: 'root', 
    password : 'autoset',
    database: 'sideshop',
    connectionLimit: 10,
}

module.exports =  mysql.createPool(dbConfig);