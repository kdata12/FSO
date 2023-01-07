import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogCreation from './components/BlogCreation'
import LogOut from './components/LogOut'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs => {
      const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)
      setBlogs(sortedBlogs)
    }
    )
  }, [])

  useEffect(() => {
    let user = window.localStorage.getItem('loggedInUser')
    if (user) {
      user = JSON.parse(user)
      blogService.setToken(user.token)
      setUser(user)
    }
  }, [])

  const loginForm = () => (
    <div>
      <h1>Log in to application</h1>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          name='username'
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
        <div>
          <input
            type="password"
            name='password'
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <button type='submit'>log in</button>
      </form>
    </div>
  )

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService
        .login({ username, password })

      window.localStorage.setItem('loggedInUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')

    } catch (exception) {
      setNotification('Wrong username or password')
      setTimeout(() => {
        setNotification(null)
      }, 5500)
    }
  }

  const addBlog = async (event) => {
    event.preventDefault()

    const result = await blogService
      .create({ title, author, url })

    setAuthor('')
    setTitle('')
    setUrl('')

    setBlogs(blogs.concat(result))

    setNotification(`a new blog "${result.title} by ${result.author}" has been added`)
    setTimeout(() => {
      setNotification(null)
    }, 5500)
  }

  const blogCreation = () => (
    <div>
      <LogOut user={user} handleLogOut={() => {
        setUser(null)
        window.localStorage.removeItem('loggedInUser')
      }} />
      <Togglable buttonLabel="create new blog">
        <BlogCreation
          addBlog={addBlog}
          title={title}
          author={author}
          url={url}
          handleTitle={({ target }) => setTitle(target.value)}
          handleAuthor={({ target }) => setAuthor(target.value)}
          handleUrl={({ target }) => setUrl(target.value)}
        />
      </Togglable>
    </div>
  )

  const handleLike = async (event, blogID, blogUpvotes) => {
    event.preventDefault()

    const newBlog = {
      likes: blogUpvotes + 1
    }
    //send a blog object
    const result = await blogService
      .incrementLike(newBlog, blogID)
    const blogs = await blogService.getAll()
    const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)
    setBlogs(sortedBlogs)
  }

  const handleRemove = async (event, blogID) => {
    event.preventDefault()
    const deleteBlog = blogs.filter(blog => blog.id === blogID)
    const userInput = window.confirm(`remove ${deleteBlog.title} by ${deleteBlog.author}`)
    if (userInput) {
      try {
        await blogService.deleteBlog(blogID)
        setBlogs(blogs.filter(blog => blog.id !== blogID))
        setNotification(`removed "${deleteBlog.title}" by ${deleteBlog.author}`)
        setTimeout(() => {
          setNotification(null)
        }, 5500)
      } catch (error) {
        console.error(error)
        setNotification(`Error --> ${error.message}`)
        setTimeout(() => {
          setNotification(null)
        }, 5500)
      }
    }
  }

  return (
    <div>
      <Notification message={notification} />
      <h2>Blogs</h2>
      {user === null ? loginForm() : blogCreation()}

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} handleLike={handleLike} handleRemove={handleRemove} />
      )}


    </div>
  )
}

export default App
