const knex = require('../config/db.connections')
const { verifyToken } = require('../modules/jwt.auth')
const router = require('express').Router()
const cloudinary = require('../modules/cloudinary')
const upload = require('../modules/multer')

// add blog post if user is logged in
router.post('/blog', verifyToken, upload.single('image'), async (req, res) => {
    try {
        console.log(req.body.authorization);
        const { id } = req.userData[0]                                  // get user id from header
        const { title, content } = req.body  
        const img = await cloudinary.uploader.upload(req.file.path)     // uploading image file
        const image = img.secure_url                                    // getting url of image from cloudinary
    
        await knex('blogs').insert({ title, content, user_id: id, image })
        return res.status(201).json({msg : 'blog added'})
    
    } catch (error) {
        res.send(error.message)
    }
})

module.exports = router