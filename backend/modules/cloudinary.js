const cloudinary = require('cloudinary').v2
const config = require('../config/config')

const cloud = cloudinary.config({
    cloud_name : config.CLOUD_NAME,
    api_key : config.API_KEY,
    api_secret : config.API_SECRET,
    secure:true

})

module.exports = cloudinary