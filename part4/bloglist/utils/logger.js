//logger.js is responsible for logger functions

const info = (...args) => {
    console.log(...args)
}

const error = (...args) => {
    console.error(...args)
}

module.exports = {
    info, error
}