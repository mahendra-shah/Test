const knex = require('../config/db.connections')
const { createToken, verifyToken } = require('../modules/jwt.auth')
const router = require('express').Router()
const valid = require('../modules/validator')



// home
router.get('/', (req, res) => {
    res.send('<h1>Bonjour</h1>')
})

// register user here
router.post('/register',valid, async (req, res) => {
    try {
        const { name, email, password } = req.body                  // get users - name, email, and password from body
        const user = await knex('users').where({ email })           // checking email in database
    
        // for user not present in database
        if (user.length === 0) {
            await knex('users').insert({ name, email, password })
            return res.send('data inserted')
        }
        res.send('already user')
        
    } catch (error) {
        res.send(error.message)
    }
})

// login user if already a user
router.post('/login', async (req, res) => {
    console.log(req.body);
    try {
        const { email, password } = req.body                            // get email and password from body
        const user = await knex('users').where({ email, password })     // checking credentials matched in database or not
    
        // if credentials matched
        if (user.length !== 0) {
            const token = createToken(user[0])          // generating token using jsonwebtoken
            // res.cookie('cookie', token) 
            return res.status(200).json({'cookie':token})                // saving token in headers
        }
        res.send('check your credentials and try again')
        
    } catch (error) {
        res.send(error.message)
    }

})


module.exports = router