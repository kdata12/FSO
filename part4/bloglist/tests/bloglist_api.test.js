const app = require('../app')
const mongoose = require('mongoose')
const supertest = require('supertest')
const Blog = require('../models/blog')
const blogMockData = require('./list_of_blogs')
const helper = require('./test_helper')

const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(blogMockData)
})

test('blog list is returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('verifies id of blog posts', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0]['_id']).toBeDefined()
})

describe('addition of new blog', () => {
    test('post new blog to endpoint', async () => {
        const blogStartData = await api.get('/api/blogs')

        const blogObject = {
            author: 'James Clear',
            title: 'Atomic Habits',
            url: 'https://www.amazon.com/Atomic-Habits-Proven-Build-Break/dp/0735211299/ref=zg_bs_books_sccl_1/131-9057278-5114754?psc=1',
            likes: 10,
        }

        await api
            .post('/api/blogs')
            .send(blogObject)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const blogEndState = await helper.blogsInDb()
        expect(blogEndState.length).toBe(blogStartData.body.length + 1)

        const allTitles = blogEndState.map(blog => blog.title)
        expect(allTitles).toContain(blogObject.title)
    })

    test('adding new blog, missing like property', async () => {
        const blogObject = {
            author: 'James Clear',
            title: 'Atomic Habits',
            url: 'https://www.amazon.com/Atomic-Habits-Proven-Build-Break/dp/0735211299/ref=zg_bs_books_sccl_1/131-9057278-5114754?psc=1',
        }

        await api
            .post('/api/blogs')
            .send(blogObject)
            .expect(201)

        const allBlogs = await helper.blogsInDb()

        const allLikes = allBlogs.map(blog => blog.likes)

        const lastLike = allLikes.pop() //get last blog added

        expect(lastLike).toBe(0)
    })

    test('adding new blog, missing title or url', async () => {
        const blogObject = {
            author: 'James Clear',
            likes: 10
        }
        await api
            .post('/api/blogs')
            .send(blogObject)
            .expect(400)
    }, 7000)
})

describe('deletion of a blog', () => {
    test('delete a single blog', async () => {
        const deletedBlogID = '5a422a851b54a676234d17f7'
        await api
            .delete(`/api/blogs/${deletedBlogID}`)
            .expect(204)
        const allBlogs = await helper.blogsInDb()

        const allId = allBlogs.map(blog => blog._id)

        expect(allId).not.toContain(deletedBlogID)
    })
})

describe('update of a blog', () => {
    test('update number of likes', async () => {
        const udpateBlogId = '5a422a851b54a676234d17f7'

        const blogObject = {
            title: "React patterns",
            author: "Michael Chan",
            url: "https://reactpatterns.com/",
            likes: 50,
        }

        let updatedBlog = await api
            .put(`/api/blogs/${udpateBlogId}`)
            .send(blogObject)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        updatedBlog = JSON.parse(JSON.stringify(updatedBlog))
        expect(updatedBlog.req.data.likes).toBe(blogObject.likes)
    })
})

afterAll(() => {
    mongoose.connection.close()
})