const userRouter = require('express').Router()
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

userRouter.post('/', async (request, response) => {
    const { username, password } = request.body

    //validate password and username
    const userOnFile = await User.findOne({ username })
    const passValidation = userOnFile === null
        ? false
        : await bcrypt.compare(password, userOnFile.passwordHash)

    if (!(userOnFile && passValidation)) {
        return response.status(400).json({
            error: 'Invalid username and password'
        })
    }
    //respond with jwt
    const userToken = {
        user: userOnFile.username,
        id: userOnFile._id
    }

    const token = jwt.sign(
        userToken,
        process.env.SECRET,
        { expiresIn: 60 * 60 }
    )

    response.status(200).json({
        token, 
        username: userOnFile.username,
        name: userOnFile.name
    })

})

module.exports = userRouter