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
