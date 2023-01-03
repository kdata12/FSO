//logger.js is responsible for logger functions

const info = (...args) => {
    if (process.env.NODE_ENV !== 'test'){
        console.log(...args)
    }
}

const error = (...args) => {
    if (process.env.NODE_ENV !== 'test'){
        console.error(...args)
    }}

module.exports = {
    info, error
}