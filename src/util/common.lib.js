const ip = require('request-ip'); // 클라이언트 Ip
const date = require('date-and-time'); // 현재 시간
const nowDateTime = date.format(new Date(), 'YYYY-MM-DD hh:mm:ss'); // 시간 0000-00-00 00:00:00
const multer = require('multer');

const rootFilePath = require('../config/config').filePath.root;

module.exports = {
    getDate : {
        dateTime : date.format(new Date(), 'YYYY-MM-DD hh:mm:ss'),
        date : date.format(new Date(), 'YYYY-MM-DD')
    },
    getIp : {
        ip : function (req) {
            return ip.getClientIp(req);
        }
    },
    fileUpload : (uploadPath) => {
        const storage =  multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, rootFilePath+uploadPath);
              },
            filename: function (req, file, cb) {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) +'.'+ file.mimetype.split('/')[1];
                cb(null, file.fieldname + '-' + uniqueSuffix);
            }
        });
        const fileFilter = (req, file, cb) => {
            let typeArray = file.mimetype.split('/');
            let fileType = typeArray[1];
            if (fileType == 'jpg' || fileType == 'png' || fileType == 'jpeg' || fileType == 'gif') {
                cb(null, true);
            } else {
                req.fileValidationError = "jpg,jpeg,png,gif 파일만 업로드 가능합니다.";
                cb(null, false)
            }
        }

        return upload = multer({
            storage: storage,
            fileFilter: fileFilter,
            limits: {
                fileSize: 5 * 1024 * 1024
            }
        });
    },
    fileUploadCheck : (filesJsonArr) => {
        /**
         * it_main_img : [
            *  {
                    fieldname: 'it_main_img',
                    originalname: '02.jpg',
                    encoding: '7bit',
                    mimetype: 'image/jpeg',
                    destination: 'B:\\03_work\\GIT_SIDE_PROJECT\\GITBACKEND\\IbstShopSideBackEnd\\data/item',
                    filename: 'it_main_img-1632968262150-663275260.jpeg',
                    path: 'B:\\03_work\\GIT_SIDE_PROJECT\\GITBACKEND\\IbstShopSideBackEnd\\data\\item\\it_main_img-1632968262150-663275260.jpeg',
                    size: 319719
                }
            ]
         * 
         */
        return function (req, res, next) {
            console.log('hello2', filesJsonArr); 
            console.log('hello2',req.files);
            
            for(let i = 0; i < filesJsonArr.length; i++){
                console.log('hello3 : ',filesJsonArr[i].name);
                
                if(!Object.keys(req.files).includes(filesJsonArr[i].name) && filesJsonArr[i].required){
                    return res.status(400).json({status : '400', msg : '이미지 등록해주세요.'});
                }else{
                    console.log('hell4 : ', req.files[filesJsonArr[i].name]);
                    if(req.files[filesJsonArr[i].name] === undefined && filesJsonArr[i].required){
                        return res.status(400).json({status : '400', msg : '이미지 업로드 실패'});
                    }
                }
            }
            next();
        }
    }
}