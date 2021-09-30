
/**
 * @swagger
 * /api/item/list:
 *  get:
 *      tags: 
 *      - item
 *      summary: "상품 목록"
 *      description: "상품 목록"
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
 * /api/item:
 *  post: 
 *      tags: 
 *      - item
 *      summary: "상품 추가"
 *      description: "상품 추가"
 *      produces:
 *      - "application/json"
 *      parameters:
 *      - name : "it_name"
 *        in: "formData"
 *        description: "상품명"
 *        required: ture
 *        type: "string"
 *      - name : "it_cnt"  
 *        in: "formData"
 *        description: "재고 수량"
 *        required: ture
 *        type: "string"
 *      - name : "it_info"  
 *        in: "formData"
 *        description: "상품 정보"
 *        required: ture
 *        type: "string" 
 *      - name : "it_price"  
 *        in: "formData"
 *        description: "가격"
 *        required: ture
 *        type: "string" 
 *      - name : "it_use"  
 *        in: "formData"
 *        description: "사용 여부 (Y, N)"
 *        required: ture
 *        type: "string" 
 *      - name : "it_main_img"  
 *        in: "formData"
 *        description: "상품 이미지"
 *        required: false
 *        type: "file" 
 *      responses:
 *          "200":
 *              description: "success"
 *          "400":
 *              description: "error"
 * 
 */

/**
 * @swagger
 * /api/item:
 *  put: 
 *      tags: 
 *      - item
 *      summary: "상품 수정"
 *      description: "상품 수정"
 *      produces:
 *      - "application/json"
 *      parameters:
 *      - name : "it_id"
 *        in: "formData"
 *        description: "상품 번호"
 *        required: ture
 *        type: "string"
 *      - name : "it_name"
 *        in: "formData"
 *        description: "상품명"
 *        required: ture
 *        type: "string"
 *      - name : "it_cnt"  
 *        in: "formData"
 *        description: "재고 수량"
 *        required: ture
 *        type: "string"
 *      - name : "it_info"  
 *        in: "formData"
 *        description: "상품 정보"
 *        required: ture
 *        type: "string" 
 *      - name : "it_price"  
 *        in: "formData"
 *        description: "가격"
 *        required: ture
 *        type: "string" 
 *      - name : "it_use"  
 *        in: "formData"
 *        description: "사용 여부 (Y, N)"
 *        required: ture
 *        type: "string" 
 *      - name : "it_main_img"  
 *        in: "formData"
 *        description: "상품 이미지"
 *        required: false
 *        type: "file" 
 *      responses:
 *          "200":
 *              description: "success"
 *          "400":
 *              description: "error"
 * 
 */