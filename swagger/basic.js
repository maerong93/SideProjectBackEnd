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
                description : "회원에 관한 처리"
            }
        ],
        schemes: ['http']
    },
    apis:["./routes/api/user.js"]
}

