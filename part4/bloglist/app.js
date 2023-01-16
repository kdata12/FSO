//App.js is responsible for loading all middleware

const express = require('express')
const app = express()
require('express-async-errors')
const mongoose = require('mongoose')
const cors = require('cors')
const config = require('./utils/config')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')
const blogRouter = require('./controllers/blog')
const userRouter = require('./controllers/user')
const loginRouter = require('./controllers/login')


logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
    .then(() => {
        logger.info('connected to MongoDB')
    })
    .catch(error => logger.error(error))

app.use(cors())
app.use(express.json())

app.use(middleware.tokenExtractor)
app.use(middleware.userExtractor)
app.use(middleware.requestLogger)

app.use('/api/login', loginRouter)
app.use('/api/user', userRouter)
app.use('/api/blogs', blogRouter)
if (process.env.NODE_ENV === 'test') {
    const testingRouter = require('./controllers/testing')
    app.use('/api/testing', testingRouter)
}

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app