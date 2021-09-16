const express = require('express');
const mysqlPromise = require('mysql2/promise');
const router = express.Router();
const commonModule = require('./common/module'); // require사용시 expor
const poolConnection = require('../../lib/mysql2Pool');
const middelwareMember = require('../../middlewares/middlewareMember');
const { verifyToken } = require('../../middlewares/middlewaresJWT');

/**
 * @swagger
 * /api/item/list:
 *  get:
 *      tags: 
 *       - item
 *      summary: "아이템 처리"
 *      description: "아이디 , 토큰 필수"
 *      produces: 
 *      - "application/json"
 *      parameters:
*      - name : "authorization"
 *        in: "header"
 *        description: "토큰"
 *        required: true
 *        type: "string"
 *      - name : "mb_id"
 *        in: "query"
 *        description: "회원아이디"
 *      responses:
 *          "200":
 *              description: "successful operation"      
 *          "400":
 *              description: "error"  
 */
router.get('/list'
    , verifyToken
    , async (req, res, next) => {
        middelwareMember.checkMember2(req.param('mb_id')).then((row) => {
            console.log('/info');
            if (row.cnt === 0) {
                const jsonData = commonModule.toJsonData('error', '등록된 회원이 아닙니다.', []);
                return res.status(400).json(jsonData);
            }
        })
        return next();
    }
    , async (req, res, next) => {
        
        poolConnection.query(" SELECT * FROM item WHERE it_use = 'Y' ").then(([row, fields]) => {
            const jsonData = commonModule.toJsonData('success', '아이템 리스트', row);
            return res.send(jsonData);
        }).catch((err) => {
            console.log('error');
            const jsonData = commonModule.toJsonData('error', '쿼리 에러', [err]);
            return res.status(400).json(jsonData);
        });

});

router.post('/add'
    
    , async (req, res, next) => {

});

module.exports = router;