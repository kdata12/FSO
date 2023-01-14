const Blog = require('../models/blog')
const blogRouter = require('express').Router()
const jwt = require('jsonwebtoken')

blogRouter.get('/', async (request, response) => {
    const result = await Blog.find({}).populate('user', { username: 1 })
    response.json(result)
})

blogRouter.post('/', async (request, response) => {
    //validate token sent with each requests
    const decodedToken = jwt.verify(request.token, process.env.SECRET)

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

    const user = request.user

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
    //validate token
    const id = request.params.id
    const blog = await Blog.findById(id)

    if (blog.user.toString() === request.user._id.toString()) {
        await Blog.findByIdAndRemove(id)
        response.status(204).end()
    } else {
        response.status(401).json({
            error: 'Not authorized to delete note'
        })
    }
})

blogRouter.put('/:id', async (request, response) => {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)

    if (!decodedToken.id) {
        return response.status(401).json({
            error: 'Invalid token or missing'
        })
    }

    const body = request.body
    const id = request.params.id

    const blogObject = {
        title: body.title,
        author: body.author,
        user: body.user,
        url: body.url,
        likes: body.likes
    }

    const updatedBlog = await Blog.findByIdAndUpdate(id, blogObject, { new: true })
    response.status(201).json(updatedBlog)
})

module.exports = blogRouter
