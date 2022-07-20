const knex = require('../config/db.connections')
const router = require('express').Router()
const config = require('../config/config')

// to get all the data in all the tables without register or login
router.get(config.BLOGS_SECRET, async(req, res)=>{
    try {
        const allBlogs = await knex('blogs')
        
        res.send(allBlogs)
    } catch (error) {
        res.send(error.message)
    }
})


module.exports = router