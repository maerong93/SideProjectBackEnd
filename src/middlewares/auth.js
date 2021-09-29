const getUser = require('../service/user-service');
const errToJson = require('error-to-json').default;

module.exports = {
    auth : async (req, res, next) => { // post 및 put 방식 으로 넘어왔을 경우 해당 파라미터 값과, 세션 정보값 비교
        let mb_id = req.body.mb_id;
        let user = await getUser.getUser2(mb_id);
        if(req.session.mb_id !== user[0].mb_id){
            return res.status(400).json({status : 'error', msg : '세션과 회원 정보가 맡지 않습니다.' });
        }
        return next();
    },
    auth2 : async (req, res, next) => { // get 방식 으로 넘어왔을 경우 해당 파라미터 값과, 세션 정보값 비교
        let mb_id = req.param('mb_id');
        let user = await getUser.getUser2(mb_id);
        if(req.session.mb_id !== user[0].mb_id){
            return res.status(400).json({status : 'error', msg : '세션과 회원 정보가 맡지 않습니다.' });
        }
        return next();
    },
    authGet : async (req, res, next) => { // 세션 정보만 체크
        console.log("req.session.mb_id1", req.session.mb_id);
        
        if(req.session.mb_id === '' || req.session.mb_id === undefined){
            return res.status(400).json({ status : 'error', msg : '세션 정보가 비어있습니다.'});
        }else{
            try {
                let user = await getUser.getUser2(req.session.mb_id.toString());
                if(req.session.mb_id === user[0].mb_id){
                    return next();
                }
            } catch (error) {
                return res.status(500).json(errToJson(error));
            }
        }
    }
}