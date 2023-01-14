const app = require('../app')
const mongoose = require('mongoose')
const supertest = require('supertest')
const Blog = require('../models/blog')
const blogMockData = require('./list_of_blogs')
const helper = require('./test_helper')
const User = require('../models/user')
const bcrypt = require('bcrypt')

const api = supertest(app)


describe('when there is one user in the database', () => {
    beforeEach(async () => {
        await User.deleteMany({})
        const passwordHash = await bcrypt.hash('test', 10)
        const user = new User({
            username: 'root',
            passwordHash,
        })

        await user.save()
    })

    test('creation of user with unique name', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'Johnny',
            password: 'test123'
        }

        await api
            .post('/api/user')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

        const usernames = usersAtEnd.map(u => u.username)
        expect(usernames).toContain(newUser.username)
    }, 100000)
}, 10000)

test('blog list is returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

describe('addition of new blog', () => {
    beforeEach(async () => {
        await Blog.deleteMany({})
        await Blog.insertMany(blogMockData)

        await User.deleteMany({})
        const passwordHash = await bcrypt.hash('test', 10)
        const user = new User({
            username: 'root',
            passwordHash,
        })

        await user.save()
    })

    test('post new blog to endpoint with authorized user', async () => {
        //login to user
        const token = await getAuthUser()

        //user post a blog
        const blogStartData = await api.get('/api/blogs')

        const blogObject = {
            author: 'James Clear',
            title: 'Atomic Habits',
            url: 'https://www.amazon.com/Atomic-Habits-Proven-Build-Break/dp/0735211299/ref=zg_bs_books_sccl_1/131-9057278-5114754?psc=1',
            likes: 10,
        }

        await api
            .post('/api/blogs')
            .set('Authorization', `bearer ${token}`)
            .send(blogObject)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const blogEndState = await helper.blogsInDb()
        expect(blogEndState.length).toBe(blogStartData.body.length + 1)

        const allTitles = blogEndState.map(blog => blog.title)
        expect(allTitles).toContain(blogObject.title)
    }, 100000)

    test('adding new blog, missing like property', async () => {
        const token = await getAuthUser()

        const blogObject = {
            author: 'James Clear',
            title: 'Atomic Habits',
            url: 'https://www.amazon.com/Atomic-Habits-Proven-Build-Break/dp/0735211299/ref=zg_bs_books_sccl_1/131-9057278-5114754?psc=1',
        }

        await api
            .post('/api/blogs')
            .set('Authorization', `bearer ${token}`)
            .send(blogObject)
            .expect(201)

        const allBlogs = await helper.blogsInDb()

        const allLikes = allBlogs.map(blog => blog.likes)

        const lastLike = allLikes.pop() //get last blog added

        expect(lastLike).toBe(0)
    })

    test('adding new blog, missing title or url', async () => {
        const token = await getAuthUser()

        const blogObject = {
            author: 'James Clear',
            likes: 10
        }
        await api
            .post('/api/blogs')
            .set('Authorization', `bearer ${token}`)
            .send(blogObject)
            .expect(400)

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(blogMockData.length)
    }, 100000)
})

describe('deletion of a blog', () => {
    beforeEach(async () => {
        await Blog.deleteMany({})
        await Blog.insertMany(blogMockData)

        await User.deleteMany({})
        const passwordHash = await bcrypt.hash('test', 10)
        const user = new User({
            username: 'root',
            passwordHash,
        })

        //root user creates a blog
        await api


        await user.save()
    })

    test('delete a single blog with authorized user', async () => {
        //get initial blog database state
        const blogStart = await helper.blogsInDb()

        //log in
        const token = await getAuthUser()

        //create blog using user id
        const blogObject = {
            author: 'James Clear',
            title: 'Atomic Habits',
            url: 'https://www.amazon.com/Atomic-Habits-Proven-Build-Break/dp/0735211299/ref=zg_bs_books_sccl_1/131-9057278-5114754?psc=1',
        }

        //post blog
        await api
            .post('/api/blogs')
            .set('Authorization', `bearer ${token}`)
            .send(blogObject)
            .expect(201)

        //get blogObject id from database
        const blogCurrentState = await helper.blogsInDb()
        const deleteBlog = blogCurrentState.filter(blog => blog.author === 'James Clear')[0]

        //send a delete request with auth token and blog id
        await api
            .delete(`/api/blogs/${deleteBlog.id}`)
            .set('Authorization', `bearer ${token}`)
            .expect(204)

        //expect database to have 1 less blog
        const blogEnd = await helper.blogsInDb()
        expect(blogEnd).toHaveLength(blogStart.length)

        //expect new database to not contain blog's title
        const allBlogsTitle = blogEnd.map(blog => blog.title)
        expect(allBlogsTitle).not.toContain(blogObject.title)
    })
}, 100000)

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


const getAuthUser = async () => {
    const user = {
        username: "root",
        password: "test"
    }

    const userRes = await api
        .post('/api/login')
        .send(user)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    return userRes.body.token
}


afterAll(() => {
    mongoose.connection.close()
})