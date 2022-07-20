const knex = require('../config/db.connections')
const { createToken, verifyToken } = require('../modules/jwt.auth')
const router = require('express').Router()

router.post('/comment/:id', verifyToken, async (req, res) => {
    try {
        const { comment } = req.body
        const user_id = req.userData[0].id
        const blog_id = req.params.id
        const check = await knex('comments').where({blog_id, user_id, comment})
        if (check.length === 0){
            await knex('comments').insert({user_id, blog_id, comment})
            return res.send('commented')
        }
        res.send('you already commented this') 
    } catch (error) {
        res.send(error.message)
    }

})

module.exports = router