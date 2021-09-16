const express = require('express');
const mysql = require('mysql2/promise');
const router = express.Router();
const commonModule = require('./common/module'); // require사용시 expor
const poolConnection = require('../../lib/mysql2Pool');
const date = require('date-and-time')
const nowDateTime = date.format(new Date(), 'YYYY-MM-DD hh:mm:ss');
const requestIp = require('request-ip');
require('dotenv').config();
const { body, validationResult } = require('express-validator'); // 유효성 검사
const commonLib = require('../../lib/common.lib');
const jwt = require('jsonwebtoken');
const middelwareMember = require('../../middlewares/middlewareMember');
const { verifyToken } = require('../../middlewares/middlewaresJWT');


/**
 * @swagger
 * /api/user/register:
 *  post:
 *      tags: 
 *       - user
 *      summary: "회원가입"
 *      description: "회원가입"
 *      produces: 
 *      - "application/json"
 *      parameters:
 *      - name : "mb_id"
 *        in: "formData"
 *        description: "회원아이디"
 *        required: ture
 *        type: "string"
 *      - name : "mb_password"
 *        in: "formData"
 *        description: "회원 비밀번호"
 *        required: true
 *        type: "string"
 *      - name : "mb_name"
 *        in: "formData"
 *        description: "회원명"
 *        required: ture
 *        type: "string" 
 *      - name : "mb_email"
 *        in: "formData"
 *        description: "이메일"
 *        required: true
 *        type: "string"
 *      - name : "mb_tel"
 *        in: "formData"
 *        description: "전화번호"
 *        required: true
 *        type: "string"
 *      - name : "mb_phone"
 *        in: "formData"
 *        description: "핸드폰번호"
 *        required: false
 *        type: "string"
 *      - name : "mb_addr1"
 *        in: "formData"
 *        description: "주소1"
 *        required: true
 *        type: "string"
 *      - name : "mb_addr2"
 *        in: "formData"
 *        description: "주소2"
 *        required: true
 *        type: "string"
 *      security : 
 *          - jwt: []
 *      responses:
 *          "200":
 *              description: "success"
 *          "400":
 *              description: "error"
 */
router.post(
    '/register',
    [
        body('mb_id', '아이디 입력하세요').notEmpty(),
        body('mb_password', '패스워드 입력하세요').notEmpty(),
        body('mb_name', '이름 입력하세요').notEmpty(),
        body('mb_email', '이메일 올바르지않습니다.').isEmail().notEmpty(),
        body('mb_phone', '핸드폰 형식이 올바르지않습니다.').isMobilePhone().notEmpty(),
        body('mb_addr1', '주소1을 입력하세요').notEmpty(),
        body('mb_addr2', '주소2을 입력하세요').notEmpty()
    ]
    , async (req, res, next) => {
        //console.log('=====req1=====');
        const errors = validationResult(req).errors //에러 배열에 접근
        if (Object.keys(errors).length !== 0) {
            let msg = errors.map((item) => {
                return { item: item.param, msg: item.msg }
            });
            const jsonData = commonModule.toJsonData('error', '에러입니다.', [msg]);
            res.status(400).json(jsonData);
        }
        next();
    }
    , async (req, res, next) => {
        commonLib.getMember(req.body.mb_id).then((row) => {
            if (row.mb_id !== '') {
                const jsonData = commonModule.toJsonData('error', '존재하는 회원 아이디 입니다.', [{ mb_id: req.body.mb_id }]);
                res.status(400).json(jsonData);
            }
        });
        next();
    }
    , async (req, res, next) => {
        const clientIp = requestIp.getClientIp(req);
        try {
            //let sql = " INSERT INTO test(mb_id, mb_name, mb_level, mb_sex, ) VALUES ? ";
            let sql2 = `
                INSERT INTO member
                ( mb_id,
                  mb_password,
                  mb_name,
                  mb_level,
                  mb_sex,
                  mb_email,
                  mb_tel,
                  mb_phone,
                  mb_addr1,
                  mb_addr2,
                  mb_ip,
                  in_datetime )
                VALUES (?, ?, ?, ? , ?, ?, ?, ?, ? , ?, ?, ?)
            `;
            let values = [
                req.body.mb_id,
                req.body.mb_password,
                req.body.mb_name,
                1 ,
                'M' ,
                req.body.mb_email ,
                req.body.mb_tel,
                req.body.mb_phone ,
                req.body.mb_addr1 ,
                req.body.mb_addr2,
                clientIp,
                nowDateTime,
            ];
            await poolConnection.query(sql2, values);
            console.log('success!');
        } catch (err) {
            const jsonData = commonModule.toJsonData('error', '쿼리 에러', [err]);
            console.log('에러 발생');
            res.status(400).json(jsonData);
            throw err;
        } 
        
        const jsonData = commonModule.toJsonData('success', '회원 가입 성공1111');
        res.send(jsonData);
});
/**
 * @swagger
 * /api/user/login:
 *  get:
 *      tags: 
 *       - user
 *      summary: "로그인 처리"
 *      description: "아이디 비밀번호 필수"
 *      produces: 
 *      - "application/json"
 *      parameters:
 *      - name : "mb_id"
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
 *          "400":
 *              description: "error"  
 */
router.get('/login'
    , async (req, res, next) => {
        middelwareMember.checkMember(req.param('mb_id'), req.param('password')).then((row) => {
            if (row.cnt === 0) {
                const jsonData = commonModule.toJsonData('error', '다시 로그인 시도해주세요.', [{ mb_id: req.body.mb_id }]);
                res.status(400).json(jsonData);
            }
        })
        next();
    }
    , async (req, res, next) => {
        try {
            const mb_id = req.param('mb_id');
            const password = req.param('password');
            const token = jwt.sign({
                mb_id,
                password
            }, process.env.JWT_SECRET, {
                expiresIn: '7d', // 7일
                issuer: '토큰발급자',
            });
            req.body.token = token;
            const jsonData = commonModule.toJsonData('success', '토큰이 발급되었습니다.', [{ mb_id: mb_id, token: token }]);
            return res.send(jsonData);
        } catch (err) {
            const jsonData = commonModule.toJsonData('error', '서버 에러', [{}]);
            return res.status(400).json(jsonData);
        }
    }
)

/**
 * @swagger
 * /api/user/info:
 *  get:
 *      tags: 
 *       - user
 *      summary: "회원 정보 확인"
 *      description: "토큰, 아이디"
 *      produces: 
 *      - "application/json"
 *      parameters:
 *      - name : "authorization"
 *        in: "header"
 *        description: "토큰"
 *        required: true
 *        type: "string"
 *      - name : "mb_id"
 *        in : "query"
 *        description: "회원아이디"
 *        required: true
 *        type: "string"
 *      responses:
 *          "200":
 *              description: "successful operation"      
 *          "400":
 *              description: "error"  
 */
router.get('/info'
    , verifyToken
    , async (req, res, next) => {
        middelwareMember.checkMember2(req.param('mb_id')).then((row) => {
            if (row.cnt === 0) {
                const jsonData = commonModule.toJsonData('error', '등록된 정보가 아닙니다.', [{}]);
                return res.status(400).json(jsonData);
            }
        })
        next();
    }
    , async (req, res, next) => {
        middelwareMember.getUserInfo(req.param('mb_id')).then((row) => {
            const jsonData = commonModule.toJsonData('success', '회원 정보', [row]);
            res.send(jsonData);
        })
})

router.get('/payHistory', (req, res, nex) => {
    let jsonData = commonModule.toJsonData('success', '결제 내역');
    res.send(jsonData);
})

module.exports = router;