const path = require('path');

module.exports = {
    ConfigDatabase : {
        host: '192.168.26.134',
        port: '3306',
        user: 'root', 
        password : 'autoset',
        database: 'sideshop',
        connectionLimit: 10,
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
    }
};