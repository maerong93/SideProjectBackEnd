const UserService = require('../service/user-service');
const errToJson = require('error-to-json').default;

module.exports = {
    getUser : async (req, res, next) => {
        let mb_id = req.param('mb_id');
        let mb_password = req.param('mb_password'); 
        try {
            let rows = await UserService.getUser(mb_id, mb_password);
            //console.log(rows);
            return res.json(rows);
        } catch (error) {
            return res.status(500).json(errToJson(error));
        }
    }
}