require('dotenv').config()
const http = require('http')
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()

app.use(express.json())
app.use(cors())

const blogSchema = new mongoose.Schema({
    author: String,
    title: String,
    url: String,
    upvotes: Number
})

const Blog = mongoose.model('Blog', blogSchema)

mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('connected to MongoDB')
    })
    .catch(error => console.log(error))

app.get('/api/blogs', (req, res) => {
    Blog.find({})
        .then(bloglist => {
            res.json(bloglist)
        })
        .catch(error => console.log(error))
})

app.post('/api/blogs', (req, res) => {
    const { author, title, url, upvotes } = req.body

    const newBlog = new Blog({
        author: author,
        title: title,
        url: url,
        upvotes: upvotes
    })

    newBlog.save()
        .then(returnedBlog => {
            res.status(201).json(returnedBlog)
        })
        .catch(error => console.log(error))
})

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`)
    console.log(`http://localhost:${PORT}`)
})

