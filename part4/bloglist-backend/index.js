/*
index.js is responsible for:
* loading app.js, config.js, logger.js
* starting the server
* listening to Port
*/
const app = require('./app')
const config = require('./utils/config')
const logger = require('./utils/logger')
const http = require('http')

const server = http.createServer(app)

server.listen(config.PORT, () => {
    logger.info(`Server running on ${config.PORT}`)
    logger.info(`http://localhost:${config.PORT}`)
})

