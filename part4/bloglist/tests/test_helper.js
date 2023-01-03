const Blog = require('../models/blog')

const mock_data = [
    {
        author: 'James Clear',
        title:'Atomic Habits',
        url: 'https://www.amazon.com/Atomic-Habits-Proven-Build-Break/dp/0735211299/ref=zg_bs_books_sccl_1/131-9057278-5114754?psc=1',
        likes: 10,
    },
    {
        author: 'Robert Greene',
        title:'The 48 Laws of Power',
        url: 'https://www.amazon.com/48-Laws-Power-Robert-Greene/dp/0140280197/ref=zg_bs_books_sccl_14/131-9057278-5114754?psc=1',
        likes: 5,
    },
    {
        author: 'Brianna Wiest',
        title:'The Mountain Is You',
        url: 'https://www.amazon.com/Mountain-You-Transforming-Self-Sabotage-Self-Mastery/dp/1949759229/ref=zg_bs_books_sccl_3/131-9057278-5114754?psc=1#customerReviews',
        likes: 2,
    },

]

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

module.exports = { blogsInDb }