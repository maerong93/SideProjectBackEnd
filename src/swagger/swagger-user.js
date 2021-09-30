// /api/user/login:
/**
 * @swagger
 * /api/user/login:
 *  post:
 *      tags: 
 *       - user
 *      summary: "로그인"
 *      description: "로그인"
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
 *      responses:
 *          "200":
 *              description: "success"
 *          "400":
 *              description: "error"
 */



/**
 *  @swagger
 *  /api/user/info:
*    post: 
*       tags: 
*       - user
*       summary: "나의 정보"
*       description: "나의 정보"
*       produces: 
*       - "application/json"
*       parameters:
*       - name : mb_id
*         in: "formData"
*         description: "회원아이디"
*         required: ture
*         type: "string"
*       responses:
*           "200":
*               description: "success"
*           "400":
*               description: "error"
 */

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
 *      responses:
 *          "200":
 *              description: "success"
 *          "400":
 *              description: "error"
 */
