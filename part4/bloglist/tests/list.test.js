const dummy = require('../utils/list_helper').dummy
const totalLikes = require('../utils/list_helper').totalLikes
const favoriteBlog = require('../utils/list_helper').favoriteBlog
const mostBlogs = require('../utils/list_helper').mostBlogs
const mostLikes = require('../utils/list_helper').mostLikes

const blogs = require('./list_of_blogs')


test('dummy returns one', () => {
    const blogs = []
    const result = dummy(blogs)
    expect(result).toBe(1)
})

describe('total likes', () => {
    const listWithOneBlog = [
        {
          _id: '5a422aa71b54a676234d17f8',
          title: 'Go To Statement Considered Harmful',
          author: 'Edsger W. Dijkstra',
          url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
          likes: 5,
          __v: 0
        }
      ]
    

    test('of list is zero', () => {
        expect(totalLikes([])).toBe(0)
    })

    test('when list has only one blog, equals the likes of that', () => {
        expect(totalLikes(listWithOneBlog)).toBe(5)
    })

    test('of a bigger list calculated right', () => {
        expect(totalLikes(blogs)).toBe(36)
    })
})

describe('most favorite', () => {
    test('of all blogs', () => {
        const expectedRes = blogs[2]
        expect(favoriteBlog(blogs)).toEqual(expectedRes)
    })
    test('of empty list', () => {
        expect(favoriteBlog([])).toBe(0)
    })
})

describe('most amount of blogs', () => {
    test('of all blogs', () => {
        const expectedRes = {author: 'Robert C. Martin', blogs: 3}
        expect(mostBlogs(blogs)).toEqual(expectedRes)
    })
})

describe('most amount of likes', () => {
    test('of all blogs', () => {
        const expectedRes = {author: 'Edsger W. Dijkstra', likes: 17}
        expect(mostLikes(blogs)).toEqual(expectedRes)
    })
})