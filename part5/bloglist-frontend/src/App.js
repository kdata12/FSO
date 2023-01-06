import { useState, useEffect } from 'react'
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
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
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
      }}/>
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

  return (
    <div>
      <Notification message={notification} />

      {user === null ? loginForm() : blogCreation()}

      <h2>Blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App
