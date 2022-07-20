const knex = require('../config/db.connections')
const { createToken, verifyToken } = require('../modules/jwt.auth')
const router = require('express').Router()


// reactions ( likes / dislikes ) if user logged in
router.post('/react/:id', verifyToken, async (req, res) => {
    try {
        const { likes, dislikes } = req.body    // get reaction from body
        const { id } = req.userData[0]          // get user id from header
        const blog_id = req.params.id           // get blod id rom params
    
        const react = await knex('reactions').where({ user_id: id, blog_id })       // checking reaction to perticular blog by logged in user
    
        // checking if any reaction given or not
        if (!likes && !dislikes) {
            return res.send("no reaction found")
        }
        // checking if both reaction given at same time or not
        else if (likes && dislikes) {
            return res.send("you can't give both reaction at same time")
        }
    
        // checking given reaction is positive or negative
        if (react.length !== 0) {
            const liked = react[0].likes
            const disliked = react[0].dislikes
    
            // like if blog not liked by user
            if (likes && !liked) {
                await knex('reactions').where({ user_id: id, blog_id }).update({ blog_id, user_id: id, likes: 1 })
                await knex('reactions').where({ user_id: id, blog_id }).update({ blog_id, user_id: id, dislikes: 0 })
                res.send("Liked")
            }
    
            // remove like if blog already liked by user
            else if (likes && liked) {
                await knex('reactions').where({ user_id: id, blog_id }).update({ blog_id, user_id: id, likes: 0 })
                res.send("Like removed")
    
            }
    
            // dislike if blog not disliked by user
            else if (dislikes && !disliked) {
                await knex('reactions').where({ user_id: id, blog_id }).update({ blog_id, user_id: id, dislikes: 1 })
                await knex('reactions').where({ user_id: id, blog_id }).update({ blog_id, user_id: id, likes: 0 })
                res.send("Disliked")
            }
    
            // dislike if blog already disliked by user
            else if (dislikes && disliked) {
                await knex('reactions').where({ user_id: id, blog_id }).update({ blog_id, user_id: id, dislikes: 0 })
                res.send("Dislike removed")
            }
    
        }
        // if user giving first time reaction on a particular blog
        else if (react.length === 0) {
            // for positive reaction
            if (likes) {
                await knex('reactions').where({ user_id: id, blog_id }).insert({ blog_id, user_id: id, likes: 1 })
                res.send("Liked")
            }
            //for negative reaction
            else if (dislikes) {
                await knex('reactions').where({ user_id: id, blog_id }).insert({ blog_id, user_id: id, dislikes: 1 })
                res.send("Disliked")
    
            }
        }
        const pos = await knex('reactions').sum('likes').where({ blog_id })                     // getting all likes sum
        const neg = await knex('reactions').sum('dislikes').where({ blog_id })                 // getting all dislikes sum
        await knex('blogs').where({id:blog_id}).update({likes:Object.values(pos[0])[0]})       // putthing the sum in blogs table 
        await knex('blogs').where({id:blog_id}).update({dislikes:Object.values(neg[0])[0]})     // ''
        
    } catch (error) {
        res.send(error.message)
    }

})

module.exports = router
