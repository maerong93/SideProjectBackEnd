/*
    swagger api 설정
*/
let basicExports = module.exports = {};

basicExports.swaggerOption = {
    swaggerDefinition: {
        info: {
            title: '쇼핑몰',
            description: 'IBST 사이드 프로젝트',
            contact: {
                name: "hello",
                description: "Everything about your Pets"
            },
            servers: ["http://localhost:3000"]
        },        
        tags: [
            {
                name: "user",
                description: "회원에 관한 처리",
            },
            {
                name : "item",
                description: "상품 관한 처리",
            },
            {
                name : "cart",
                description: "장바구니",
            },
            {
                name : "order",
                description: "주문",
            },
        ],
        schemes: ['http']
    },
    apis: [
        "./src/swagger/swagger-user.js",
        "./src/swagger/swagger-item.js",
        "./src/swagger/swagger-cart.js",
        "./src/swagger/swagger-order.js",
    ]
}

