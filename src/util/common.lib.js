const ip = require('request-ip'); // 클라이언트 Ip
const date = require('date-and-time'); // 현재 시간
const nowDateTime = date.format(new Date(), 'YYYY-MM-DD hh:mm:ss'); // 시간 0000-00-00 00:00:00

module.exports = {
    getDate : {
        dateTime : date.format(new Date(), 'YYYY-MM-DD hh:mm:ss'),
        date : date.format(new Date(), 'YYYY-MM-DD hh:mm:ss')
    },
    getIp : {
        ip : function (req) {
            return ip.getClientIp(req);
        }
    }
}