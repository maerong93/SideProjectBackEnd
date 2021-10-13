// mysql2의 필요한 유틸 처리
const mysql = require('mysql2');

module.exports = {
    format : mysql.format,
    escape : mysql.escape
}