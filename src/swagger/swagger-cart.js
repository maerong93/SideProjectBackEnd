/**
 * @swagger
 * /api/cart:
 *  get: 
 *      tags: 
 *      - cart
 *      summary: "장바구니 리스트"
 *      description: "장바구니 리스트"
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
 * /api/cart:
 *  post: 
 *      tags: 
 *      - cart
 *      summary: "장바구니 추가"
 *      description: "장바구니 추가"
 *      produces:
 *      - "application/json"
 *      parameters:
 *      - name : "it_id"
 *        in : "formData"
 *        description: "상품 아이디"
 *        required: ture
 *        type: "integer"
 *      - name : "ct_cnt"  
 *        in: "formData"
 *        description: "수량"
 *        required: ture
 *        type: "integer" 
 *      responses:
 *          "200":
 *              description: "success"
 *          "400":
 *              description: "error"
 * 
 */

/**
 * @swagger
 * /api/cart:
 *  put: 
 *      tags: 
 *      - cart
 *      summary: "장바구니 수정"
 *      description: "장바구니 수량 수정"
 *      produces:
 *      - "application/json"
 *      parameters:
 *      - name : ct_id
 *        in : "formData"
 *        description: "장바구니 아이디"
 *        required: ture
 *        type: "integer"
 *      - name : "it_id"
 *        in : "formData"
 *        description: "상품 아이디"
 *        required: ture
 *        type: "integer"
 *      - name : "ct_cnt"  
 *        in: "formData"
 *        description: "수량"
 *        required: ture
 *        type: "integer" 
 *      responses:
 *          "200":
 *              description: "success"
 *          "400":
 *              description: "error"
 * 
 */

/**
 * @swagger
 * /api/cart:
 *  delete: 
 *      tags: 
 *      - cart
 *      summary: "장바구니 삭제"
 *      description: "장바구니 삭제"
 *      produces:
 *      - "application/json"
 *      parameters:
 *      - name : ct_id
 *        in : "formData"
 *        description: "장바구니 아이디"
 *        required: ture
 *        type: "integer"
 *      responses:
 *          "200":
 *              description: "success"
 *          "400":
 *              description: "error"
 * 
 */