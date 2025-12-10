const multer = require('multer');
const path = require('path');
const fs = require('fs');


// Set up storage engine
const storage = multer.diskStorage({
    destination:  (req, file, cb) =>{
        const uploadPath = path.join(__dirname, '../public/uploads/images');

        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        const imageName = Date.now() +"-" + Math.random() + path.extname(file.originalname);
        cb(null, imageName);
    }
 });
 const upload = multer({ storage: storage });

 module.exports = upload;