const jwt = require('jsonwebtoken')
const knex = require('../config/db.connections')
const config = require('../config/config')


const createToken = ({ id }) => {
    return jwt.sign(id, config.AUTH_SECRET)
}

const verifyToken = async (req, res, next) => {
    if (req.headers.cookie) {
        const token = req.headers.cookie.split("=")[1]
        const id = jwt.verify(token, config.AUTH_SECRET)
        const user = await knex("users").where({ id })
        req.userData = user
        next()
    } else {
        res.send("token expired")
    }
}

module.exports = { createToken, verifyToken }