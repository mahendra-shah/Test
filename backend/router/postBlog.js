const knex = require('../config/db.connections')
const { createToken, verifyToken } = require('../modules/jwt.auth')
const router = require('express').Router()
const cloudinary = require('../modules/cloudinary')
const upload = require('../modules/multer')

// add blog post if user is logged in
router.post('/blog', verifyToken, upload.single('image'), async (req, res) => {
    try {
        const { id } = req.userData[0]                                  // get user id from header
        const { title, content } = req.body                             // get blog title and content from body
        const img = await cloudinary.uploader.upload(req.file.path)     // uploading image file
        const image = img.secure_url                                    // getting url of image from cloudinary
        const blog = await knex('blogs').where({ title })               // checking blog with given title is present in database or not    
    
        // add blog post if blog with same title is not present in database 
        if (blog.length === 0) {
            await knex('blogs').insert({ title, content, user_id: id, image })
            return res.send('blog added')
        }
        res.send('blog exists')
        
    } catch (error) {
        res.send(error.message)
    }
})

module.exports = router