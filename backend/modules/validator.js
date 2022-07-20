const joi = require("joi")

const valid = ((req,res,next)=>{
    try {
        const schemaValidate = joi.object({
            name:joi.string().required(),
            email:joi.string().email().required(),
            password : joi.string().min(8).required()
        })
        let data = schemaValidate.validate(req.body)
        if(data.error){
            res.send("please fill all the fields properly")
            return
        }
        next()
        
    } catch (error) {
        res.send(error.message)
    }
})

module.exports = valid