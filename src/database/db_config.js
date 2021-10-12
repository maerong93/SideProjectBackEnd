/**
 * DB 연결 설정 처리 
 */
const mysql = require('mysql2/promise');
const config = require('../config/config');

const dbConfig = {
    host: config.ConfigDatabase.host,
    port: config.ConfigDatabase.port,
    user: config.ConfigDatabase.user, 
    password : config.ConfigDatabase.password,
    database: config.ConfigDatabase.database,
    connectionLimit: 10,
    dateStrings : config.ConfigDatabase.dateStrings,
}

module.exports =  mysql.createPool(dbConfig);