const expressValidator = require('express-validator');

module.exports = {
    register : {
        conditional : () => {
            return [
                expressValidator.body('mb_email', "이메일을 올바르게 입력해주세요.").isEmail(),
                //expressValidator.body('mb_tel', "전화번호를 올바르게 입력해주세요.").isMobilePhone(),
                expressValidator.body('mb_phone', "핸드폰 번호를 올바르게 입력해주세요.").isMobilePhone()
            ];
        },
        func : async (req, res, next ) => {
            const errors = expressValidator.validationResult(req);
            if(errors.isEmpty()){
                return next();
            }
            return res.json({status: 'error', msg : '회원 가입 오류 발생', data : errors.array()});
        }
    }
}