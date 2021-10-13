
/**
 * @swagger
 * /api/order:
 *  get:
 *      tags: 
 *      - order
 *      summary: "결제 내역"
 *      description: "결제 내역"
 *      produces:
 *      - "application/json"
 *      responses:
 *          "200":
 *              description: "success"
 *          "400":
 *              description: "error"
 * 
 */

/**
 * @swagger
 * /api/order:
 *  post:
 *      tags: 
 *      - order
 *      summary: "결제"
 *      description: "결제 처리"
 *      produces:
 *      - "application/json"
 *      parameters:
 *      - name : "body"
 *        in: "body"
 *        description: "장바구니번호"
 *        type: "object"
 *        required : 
 *        - ct_id
 *        properties :
 *           ct_id : 
 *              type : array
 *              items : 
 *                  type: integer
 *              example: [장바구니아이디1, 장바구니아이디2, 장바구니아이디3]
 *           od_addr1 : 
 *              type : string
 *              example : "주소1"
 *           od_addr2 : 
 *              type : string
 *              example : "주소1"
 *           od_tel : 
 *              type : string
 *              example : "055-000-0000"
 *           od_hp : 
 *              type : string
 *              example : "010-0000-0000"
 *           od_email : 
 *              type : string
 *              example : "xxx@naver.com"
 *      responses:
 *          "200":
 *              description: "success"
 *          "400":
 *              description: "error"
 * 
 */