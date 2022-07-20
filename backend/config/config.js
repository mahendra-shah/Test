require('dotenv').config()

const config = {
    PORT : process.env.PORT,
    PASSWORD : process.env.PASSWORD,
    CLOUD_NAME : process.env.CLOUD_NAME,
    API_KEY : process.env.API_KEY,
    API_SECRET : process.env.API_SECRET,
    BLOGS_SECRET : process.env.BLOGS_SECRET,
    AUTH_SECRET : process.env.AUTH_SECRET

}

module.exports = config
