const express = require('express');
const mysqlPromise = require('mysql2/promise');
const router = express.Router();
const commonModule = require('./common/module'); // require사용시 expor
const poolConnection = require('../../lib/mysql2Pool');
const middelwareMember = require('../../middlewares/middlewareMember');
const { verifyToken } = require('../../middlewares/middlewaresJWT');
require('dotenv').config();
const { body, validationResult, check, expressValidator } = require('express-validator'); // 유효성 검사
const multer = require('multer');
const itemPath = process.env.FILE_ITEM_PATH;
const { storageOption, fileFilter } = require('../../lib/multerOption');
const upload = multer({ storage: storageOption(itemPath), fileFilter: fileFilter });
const requestIp = require('request-ip');
const date = require('date-and-time');
const nowDateTime = date.format(new Date(), 'YYYY-MM-DD hh:mm:ss');

/**
 * @swagger
 * /api/item/list:
 *  get:
 *      tags: 
 *       - item
 *      summary: "상품 리스트"
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
 *        type: "string"
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
/**
 * @swagger
 * /api/item/{:it_id}:
 *  get:
 *      tags: 
 *       - item
 *      summary: "상품 상세 정보"
 *      description: "아이디 , 토큰 필수"
 *      produces: 
 *      - "application/json"
 *      parameters:
 *      - name : "it_id"
 *        in: "query"
 *        description: "상품 아이디"
 *        type: "string"
 *      responses:
 *          "200":
 *              description: "successful operation"      
 *          "400":
 *              description: "error"  
 */
router.get('/:it_id'
    , async (req, res, next) => {
        console.log(req.params.it_id);
        return res.send({ msg: 'test' });
    });

/**
 * @swagger
 * /api/item/:
 *  post:
 *      tags: 
 *       - item
 *      summary: "상품 생성"
 *      description: "회원아이디 , 토큰 필수"
 *      consumes:
 *      - multipart/form-data
 *      produces: 
 *      - "application/json"
 *      parameters:
 *      - name : "it_name"
 *        in : "formData"
 *        description: "상품명" 
 *        required : true
 *        type: "string"
 *      - name : "it_cnt"
 *        in : "formData"
 *        description: "수량" 
 *        required : true
 *        type: "integer"  
 *      - name : "it_info"
 *        in : "formData"
 *        description: "상품 정보" 
 *        required : true
 *        type: "string" 
 *      - name : "it_price"
 *        in : "formData"
 *        description: "상품 가격" 
 *        required : true
 *        type: "integer"  
 *      - name : "it_use"
 *        in : "formData"
 *        description: "사용 여부 (Y : 사용, N : 미사용)" 
 *        required : true
 *        type: "string"  
 *        enum: [ "Y", "N"]
 *      - name : "it_main_img"
 *        in: "formData"
 *        description: "메인 파일"
 *        required : true
 *        type : "file"
 *      - name : "mb_id"
 *        in : "formData"
 *        description: "회원아이디" 
 *        required : true
 *        type: "string" 
 *      - name : "mb_name"
 *        in : "formData"
 *        description: "회원명" 
 *        required : true
 *        type: "string" 
 *      responses:
 *          "200":
 *              description: "successful operation"      
 *          "400":
 *              description: "error"  
 */
router.post('/'
    , [
        body('it_name', '상품명을 입력하세요').notEmpty(),
        body('it_cnt', '수량의 값을 올바르게 입력해주세요.').isNumeric().isLength({ min: 0 }),
        body('it_info', '상품정보 5글자에서 255이내로 입력해주세요.').isLength({ min: 5, max:255 }),
        body('it_price', '상품값을 올바르게 입력해주세요.').isNumeric().isLength({ min: 0 }),
        body('it_use', '사용여부를 선택해주세요.').isIn(['Y', 'N']),
        //body('it_main_img', '메인 이미지를 업로드 해주세요.').notEmpty(),
        body('mb_id', '아이디를 입력하세요.').notEmpty(),
        body('mb_name', '회원 명을 입력하세요.').notEmpty(),
    ]
    , async (req, res, next) => {
        middelwareMember.checkMember2(req.body.mb_id).then((row) => {
            console.log('/info');
            if (row.cnt === 0) {
                const jsonData = commonModule.toJsonData('error', '등록된 회원이 아닙니다.', []);
                return res.status(400).json(jsonData);
            }
            return next();
        })
        
    }
    // , async (req, res, next) => {
    //     upload.single('it_main_img')(req, res, function (err) {
    //         if (err instanceof multer.MulterError) {
    //             const jsonData = commonModule.toJsonData('error', '파일 업로드 에러야~~~!!! 빵꾸 똥꾸~~~~', [err]);
    //             return res.status(400).json(jsonData);
    //         } else if (err) {
    //             const jsonData = commonModule.toJsonData('error', req.fileValidationError, [err]);
    //             return res.status(400).json(jsonData);
    //         } else {
    //             return next();
    //         }
    //     })
    // }
    , async (req, res, next) => {
        // try {
        // let sql = `
        // INSERT INTO itemd
        // ( it_name , it_cnt, it_info , it_price ,
        //   it_use  , it_main_img     , mb_id    , mb_name,
        //   in_datetime
        // )
        // VALUES
        // ( ?, ?,
        //   ?, ?,
        //   ?, ?,
        //   ?, ?)
        // `;
        //     console.log(req.body);
            
        // // let values = [
        // //     req.body.it_name, req.body.it_cnt,
        // //     req.body.it_info, req.body.it_price,
        // //     req.body.it_use, 'hello',
        // //     req.body.mb_id, req.body.mb_name,
        // //     nowDateTime
        // // ];
        
        // let values = [
        //     '1', '1',
        //     '1', '1',
        //     '1', '1',
        //     '1', '1'
        // ];
        // await poolConnection.query(sql, values);
        // console.log('success!');
        // } catch (err) {
        //     const jsonData = commonModule.toJsonData('error', '쿼리 에러', [err]);
        //     console.log('에러 발생');
        //     res.status(400).json(jsonData);
        //     throw err;
        // }
        const jsonData = commonModule.toJsonData('success', '상폼 저장되었습니다.');
        return res.json(jsonData);
});

/**
 * @swagger
 * /api/item/{:it_id}:
 *  put:
 *      tags: 
 *       - item
 *      summary: "상품 수정"
 *      description: "아이디 , 토큰 필수"
 *      produces: 
 *      - "application/json"
 *      parameters:
 *      - name : "it_id"
 *        in: "query"
 *        description: "상품 아이디"
 *      responses:
 *          "200":
 *              description: "successful operation"      
 *          "400":
 *              description: "error"  
 */
router.put('/'
    
    , async (req, res, next) => {
        
});

module.exports = router;