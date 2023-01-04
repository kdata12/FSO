const Blog = require('../models/blog')
const User = require('../models/user')
const blogRouter = require('express').Router()
const jwt = require('jsonwebtoken')

blogRouter.get('/', async (request, response) => {
    const result = await Blog.find({}).populate('user', { username: 1 })
    response.json(result)
})

const getTokenFrom = (request) => {
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        return authorization.substring(7)
    }
    return null
}

blogRouter.post('/', async (request, response) => {
    //validate token sent with each requests
    const token = getTokenFrom(request)
    const decodedToken = jwt.verify(token, process.env.SECRET)

    if (!decodedToken.id) {
        return response.status(401).json({
            error: 'Invalid token or missing'
        })
    }

    const body = request.body

    if (!(body.url && body.title)) {
        return response.status(400).json({
            error: "missing title or url"
        })
    }

    if (!body.likes) {
        request.body.likes = 0
    }

    const user = await User.findById(decodedToken.id)

    const blog = new Blog({
        author: body.author,
        title: body.title,
        url: body.url,
        likes: body.likes,
        user: user._id
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.status(201).json(savedBlog)

})

blogRouter.delete('/:id', async (request, response) => {
    const id = request.params.id
    await Blog.findByIdAndRemove(id)
    response.status(204).end()
})

blogRouter.put('/:id', async (request, response) => {
    const body = request.body
    const id = request.params.id

    const blogObject = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    }

    const updatedBlog = await Blog.findByIdAndUpdate(id, blogObject, { new: true })
    response.status(201).json(updatedBlog)
})

module.exports = blogRouter
