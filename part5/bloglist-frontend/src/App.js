import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import {
  initialize,
  createBlog,
  updateBlog,
  deleteBlog,
} from './reducers/bloglistReducer'
import { showNotificationWithTimeout } from './reducers/notificationReducer'
import { login, logout, loginWithLocalstorage } from './reducers/loginReducer'
import { useSelector, useDispatch } from 'react-redux'

const App = () => {
  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.bloglist)
  const user = useSelector((state) => state.user)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    dispatch(loginWithLocalstorage())
    dispatch(initialize())
  }, [dispatch])

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)

    try {
      dispatch(login(username, password))
      setUsername('')
      setPassword('')
    } catch (exception) {
      dispatch(showNotificationWithTimeout('Wrong credentials', 5, 'error'))
    }
  }

  const handleLogout = async () => {
    dispatch(logout())
  }

  const addBlog = (blog) => {
    blogFormRef.current.toggleVisibility()
    dispatch(createBlog(blog))
    dispatch(
      showNotificationWithTimeout(
        `a new blog ${blog.title} by ${blog.author} added`,
        5,
        'success'
      )
    )
  }

  const handleLikeChange = async (blog) => {
    dispatch(updateBlog(blog))
  }

  const handleRemove = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      dispatch(deleteBlog(blog.id))
    }
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          id="username"
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          id="password"
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button id="login-button" type="submit">
        login
      </button>
    </form>
  )

  const blogFormRef = React.createRef()

  const blogForm = () => (
    <Togglable buttonLabel="new note" ref={blogFormRef}>
      <BlogForm createBlog={addBlog}></BlogForm>
    </Togglable>
  )

  return (
    <div>
      {user === null ? (
        <div>
          <h2>log in to application</h2>
          <Notification />
          {loginForm()}
        </div>
      ) : (
        <div>
          <h2>blogs</h2>
          <Notification />
          {user.name || user.username} logged in
          <button onClick={handleLogout}>logout</button>
          <h2>create new</h2>
          {blogForm()}
          {blogs.map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              user={user}
              handleRemove={handleRemove}
              handleLikeChange={handleLikeChange}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default App
