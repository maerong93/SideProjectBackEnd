const UserService = require('../service/user-service');
const errToJson = require('error-to-json').default;

module.exports = {
    loginUser : async (req, res, next) => {
        let mb_id = req.body.mb_id;
        let mb_password = req.body.mb_password;
        try {
            let rows = await UserService.getUser(mb_id, mb_password);
            console.log('hello', rows);
            if(rows === undefined || rows.length === 0){
                return res.status(500).json({status: 'error', msg : '존재하지 않는 회원입니다.'})
            }

            if(req.session.mb_id === undefined ){
                req.session.mb_id = mb_id;
                return res.json({status: 'sucsess', msg : '로그인 되었습니다.'});
            }else if(req.session.mb_id !== mb_id){
                req.session.destroy(err => {
                    if (err) {
                        return res.status(500).send("<h1>500 error</h1>"); 
                    }
                    return res.json({status: 'error', msg : '잘못된 로그인 입니다. 로그아웃됩니다.'});
                })
                
            }else{
                return res.json({status: 'error', msg : '이미 로그인 되었습니다.'});
            }

        } catch (error) {
            return res.status(500).json(errToJson(error));
        }
    },
    getUser : async (req, res, next) => { // post 방식 
        let mb_id = req.body.mb_id;
        try {
            let rows = await UserService.getUser2(mb_id);
            //console.log(rows);
            return res.json(rows);
        } catch (error) {
            return res.status(500).json(errToJson(error));
        }
    },
    getUser2 : async (req, res, next) => { // get 방식
        let mb_id = req.param('mb_id');
        try {
            let rows = await UserService.getUser2(mb_id);
            return res.json(rows);
        } catch (error) {
            return res.status(500).json(errToJson(error));
        }
    }
}