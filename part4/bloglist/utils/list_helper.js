const blogs = require('../tests/list_of_blogs')


const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    function callback(sum, blog) {
        return sum + blog.likes
    }

    return blogs.length === 0 ? 0 : blogs.reduce(callback, 0)
}

const favoriteBlog = (blogs) => {
    const sortedBlogs = blogs.sort((a, b) => {
        return b.likes - a.likes 
    })

    return blogs.length === 0 ? 0 : sortedBlogs[0]
}

const mostBlogs = (blogs) => {
    const map = new Map([])
    let res = {
        author: '',
        blogs: 0
    }

    blogs.forEach(blog => {
        const author = blog.author

        if (!map.has(author)) {
            map.set(author, 1)

        } else {
            map.set(author, map.get(author) + 1)
        }
    })

    map.forEach((blogsAmount, author) => {
        if (blogsAmount > res.blogs) {
            res.blogs = blogsAmount
            res.author = author
        }
    })

    return res
}

const mostLikes = (blogs) => {
    const map = new Map([])
    let res = {
        author: '',
        likes: 0
    }

    blogs.forEach(blog => {
        const author = blog.author
        const likes = blog.likes

        if (!map.has(author)) {
            map.set(author, likes)

        } else {
            map.set(author, map.get(author) + likes)
        }
    })

    map.forEach((likes, author) => {
        if (likes > res.likes) {
            res.likes = likes
            res.author = author
        }
    })

    return res
}



module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}