const getUser = require('../service/user-service');


module.exports = {
    auth : async (req, res, next) => { // post 및 put 방식 체크
        let mb_id = req.body.mb_id;
        let user = await getUser.getUser2(mb_id);
        if(req.session.mb_id !== user[0].mb_id){
            return res.status(400).json({status : 'error', msg : '세션과 회원 정보가 맡지 않습니다.' });
        }
        return next();
    },
    auth2 : async (req, res, next) => { // get 방식 체크
        let mb_id = req.param('mb_id');
        let user = await getUser.getUser2(mb_id);
        if(req.session.mb_id !== user[0].mb_id){
            return res.status(400).json({status : 'error', msg : '세션과 회원 정보가 맡지 않습니다.' });
        }
        return next();
    },
}