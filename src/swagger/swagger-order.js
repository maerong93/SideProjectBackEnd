
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
 *      requestBody:
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
 *              example: [1, 2, 3]
 *      - name : "od_addr1"
 *        in: "formData"
 *        description: "주소1"
 *        required: false
 *        type: "string"
 *      - name : "od_addr2"
 *        in: "formData"
 *        description: "주소2"
 *        required: false    
 *        type: "string"
 *      - name : "od_tel"
 *        in: "formData"
 *        description: "전화번호"
 *        required: false
 *        type: "string"
 *      - name : "od_hp"
 *        in: "formData"
 *        description: "핸드폰번호"
 *        required: false
 *        type: "string"
 *      - name : "od_email"
 *        in : "formData"
 *        description: "이메일주소"
 *        required: false
 *        type: "string"
 *      responses:
 *          "200":
 *              description: "success"
 *          "400":
 *              description: "error"
 * 
 */