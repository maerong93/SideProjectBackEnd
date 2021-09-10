const express = require('express');
const router = express.Router();
const commonModule = require('./common/module'); // require사용시 expor
require('dotenv').config();



/**
 * @swagger
 * /user/login:
 *  get:
 *      tags: 
 *       - user
 *      summary: "로그인 처리"
 *      description: "아이디 비밀번호 필수"
 *      produces: 
 *      - "application/json"
 *      parameters:
 *      - name : "id"
 *        in: "query"
 *        description: "회원아이디"
 *        required: true
 *        type: "string"
 *      - name : "password"
 *        in : "query"
 *        description: "비밀번호"
 *        required: true
 *      responses:
 *          "200":
 *              description: "successful operation"        
 */
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