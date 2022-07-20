const express = require('express')
const app = express()
const config =  require('./config/config')
const PORT = config.PORT
const cors = require('cors')

// Middlewares
app.use(cors())
app.use(express.json())

app.use('/', require('./router/logSign'))
app.use('/', require('./router/postBlog'))
app.use('/', require('./router/reaction'))
app.use('/', require('./router/comment'))
app.use('/', require('./router/profile'))
app.use('/api', require('./router/secret'))


app.listen(PORT, () => {
    console.log('server connected to PORT', PORT);
})