const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        minlength: 5
    },
    phone: {
        type: String,
    },
    street: {
        type: String,
        required: true,
        minlength: 5
    },
    city: {
        type: String,
        required: true,
        minlength: 3
    },
})

const Person = mongoose.model('Person', schema)


module.exports = Person