const Blog = require('../models/blog')
const blogs = require('../tests/list_of_blogs')
const blogRouter = require('express').Router()

blogRouter.get('/', async (request, response) => {
    const result = await Blog.find({})
    response.json(result)
})

blogRouter.post('/', async (request, response, next) => {
    if (!request.body.url || !request.body.title) {
        return response.status(400)
    }

    if (!request.body.likes) {
        request.body.likes = 0
    }

    const blog = new Blog(request.body)
    const newBlog = await blog.save()
    response.status(201).json(newBlog)

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
