const multer = require('multer');



const storageOption = (storagePath) => multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, storagePath)
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
        cb(new Error('I don\'t have a clue!'));
    }
}

module.exports = {
    storageOption,
    fileFilter
}