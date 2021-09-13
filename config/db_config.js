/*
    DB 연결 필요한 설정값
*/
module.exports = (() => {
    return {
        host: process.env.DB_HOST,
        user: process.env.DB_ID,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
    }
})(); // 즉시 실행 함수