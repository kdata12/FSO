const userRouter = require('express').Router()
const User = require('../models/user')
const Blog = require('../models/blog')
const bcrypt = require('bcrypt')

userRouter.get('/', async (request, response) => {
    const allUsers = await User.find({}).populate('blogs', { author: 1, title: 1, url: 1, likes: 1})
    response.json(allUsers)
})

userRouter.post('/', async (request, response) => {
    const { username, name, password } = request.body

    const duplicateUser = await User.findOne({ username })
    if (!(username && password)) {
        return response.status(400).json({
            error: 'missing username or password'
        })
    } else if (password.length < 3) {
        return response.status(400).json({
            error: 'password must be at least 3 characters long'
        })
    } else if (duplicateUser) {
        return response.status(400).json({
            error: 'Username has already been taken. Please enter a unique username'
        })
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
        username,
        name,
        passwordHash
    })

    const savedUser = await user.save()
    response.status(201).json(savedUser)
})


module.exports = userRouter
