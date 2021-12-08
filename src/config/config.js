const path = require('path');

module.exports = {
    ConfigDatabase : {
        host: 'localhost',
        port: '3306',
        user: 'root', 
        password : 'autoset',
        database: 'node',
        connectionLimit: 10,
        dateStrings: 'date',
    },

    ConfigSession : {
        secret : 'ibst0552997730!',
        resave: false,
        saveUninitialized: true,
    },

    ConfigFileStore : {
        path : path.normalize(process.cwd()+'/data/session'),
    },

    filePath : {
        root : path.normalize(process.cwd()+'/data'),
        item : path.normalize(process.cwd()+'/data/item'),
        session : path.normalize(process.cwd()+'/data/session')
    },

    fileUrl : {
        root : "",
        item : "",
        session : "",
    },
    corsOptions : {
        origin: true, // 접근 권한을 부여하는 도메인
        credentials: true, // 응답 헤더에 Access-Control-Allow-Credentials 추가
        optionsSuccessStatus: 200 // 응답 상태 200으로 설정 
    }
};