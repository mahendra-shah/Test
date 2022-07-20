const jwt = require('jsonwebtoken')
const knex = require('../config/db.connections')
const config = require('../config/config')


const createToken = ({ id }) => {
    return jwt.sign(id, config.AUTH_SECRET)
}

const verifyToken = async (req, res, next) => {
    if (req.headers.authorization) {
        console.log(req.headers.authorization, 'author here');
        // return
        const token = req.headers.authorization
        const id = jwt.verify(token, config.AUTH_SECRET)
        const user = await knex("users").where({ id })
        req.userData = user
        next()
    } else {
        res.send("token expired")
    }
}

module.exports = { createToken, verifyToken }