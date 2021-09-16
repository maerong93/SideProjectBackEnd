const express = require('express');
const mysqlPromise = require('mysql2/promise');
const router = express.Router();
const commonModule = require('./common/module'); // require사용시 expor
const poolConnection = require('../../lib/mysql2Pool');
const middelwareMember = require('../../middlewares/middlewareMember');
const { verifyToken } = require('../../middlewares/middlewaresJWT');
require('dotenv').config();
const multer = require('multer');
const itemPath = process.env.FILE_ITEM_PATH;
const { storageOption, fileFilter } = require('../../lib/multerOption');
const upload = multer({ storage: storageOption(itemPath) , fileFilter : fileFilter});

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
        return res.status(200).json({ msg: 'test' });
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
 *      - name : "it_main_img"
 *        in: "formData"
 *        description: "메인 파일"
 *        required : true
 *        type : file
 *      responses:
 *          "200":
 *              description: "successful operation"      
 *          "400":
 *              description: "error"  
 */
router.post('/'
    , async (req, res, next) => {
        upload.single('it_main_img')(req, res, function (err) {
            if (err instanceof multer.MulterError) {
                const jsonData = commonModule.toJsonData('error', '파일 업로드 에러야~~~!!! 빵꾸 똥꾸~~~~', [err]);
                return res.status(400).json(jsonData);
            } else if (err) {
                const jsonData = commonModule.toJsonData('error', req.fileValidationError, [err]);
                return res.status(400).json(jsonData);
            } else {
                return next();
            }
        })
    }
    , async (req, res, next) => {
        console.log('hello~~~');
        console.log(req.file);
        return res.status(200).json({ msg: 'test' });
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