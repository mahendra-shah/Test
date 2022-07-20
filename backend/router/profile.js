const knex = require('../config/db.connections')
const { createToken, verifyToken } = require('../modules/jwt.auth')
const router = require('express').Router()

router.get('/profile', verifyToken, async (req, res) => {
    try {
        const { id } = req.userData[0]
        const per = await knex('users as My-Profile').where({ id })                   // all personal data
        const rea = await knex('reactions').join('users', 'reactions.id', 'users.id')       // reacted blogs
        const coms = await knex('comments').join('users', 'comments.user_id', 'users.id')      // commented blogs
        const combo = [
            {'Personal Details':per}, 
            {'Reacted Blogs':rea}, 
            {'Commented blogs':coms}
        ]
        res.send(combo)
        
    } catch (error) {
        res.send(error.message)
    }

})


module.exports = router