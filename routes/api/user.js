const express = require('express');
const router = express.Router();
const commonModule = require('./common/module'); // require사용시 expor
require('dotenv').config();



router.get('/login', (req, res, next) => {
    console.log(process.env.DB_HOST);
    const jsonData = commonModule.toJsonData('success', '로그인 성공');
    res.send(jsonData);
})

router.get('/info', (req, res, next) => {
    let jsonData = commonModule.toJsonData('warrning', '너의 정보');
    res.send(jsonData);
})

router.get('/payHistory', (req, res, nex) => {
    let jsonData = commonModule.toJsonData('success', '결제 내역');
    res.send(jsonData);
})

module.exports = router;