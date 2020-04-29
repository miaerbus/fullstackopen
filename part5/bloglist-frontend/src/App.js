import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Notification from './components/Notification'
import BlogView from './components/BlogView'
import Blogs from './components/Blogs'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import Users from './components/Users'
import User from './components/User'
import { createBlog } from './reducers/bloglistReducer'
import { showNotificationWithTimeout } from './reducers/notificationReducer'
import { login, logout, loginWithLocalstorage } from './reducers/loginReducer'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    dispatch(loginWithLocalstorage())
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

  return (
    <Router>
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
            <Switch>
              <Route path="/blogs/:id" component={BlogView} />
              <Route path="/users/:id" component={User} />
              <Route path="/users" component={Users} />
              <Route path="/">
                <h2>create new</h2>
                {blogForm()}
                <Blogs />
              </Route>
            </Switch>
          </div>
        )}
      </div>
    </Router>
  )
}

export default App
