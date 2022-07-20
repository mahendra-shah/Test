const multer = require("multer")
const path  = require("path")

const upload = multer({
    storage:multer.diskStorage({
        filename:((req, file, cb)=>{
            const suffix = path.extname(file.originalname);
            if (suffix != '.jpg' && suffix != '.jpeg' && suffix != '.png') {
                cb(new Error('supported image types are ( .jpg, .jpeg, .png )'), false)
                return
            }
            cb(null, 'true')
        })
    })
})

module.exports = upload