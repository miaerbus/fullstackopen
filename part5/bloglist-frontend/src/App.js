import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
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
import styled from 'styled-components'

const Button = styled.button`
  background: Bisque;
  font-size: 1em;
  margin: 0em;
  padding: 0.25em 1em;
  border: 2px solid Chocolate;
  border-radius: 3px;
`

const Input = styled.input`
  margin: 0.25em;
`

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
        <Input
          id="username"
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <Input
          id="password"
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <Button id="login-button" type="submit">
        login
      </Button>
    </form>
  )

  const blogFormRef = React.createRef()

  const blogForm = () => (
    <Togglable buttonLabel="create new" ref={blogFormRef}>
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

  const menuStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 5,
    backgroundColor: 'lightgrey',
  }

  const menuGroupStyle = {
    display: 'flex',
    alignItems: 'center',
  }

  const menuItemStyle = {
    marginRight: 5,
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
            <div className="menu" style={menuStyle}>
              <div style={menuGroupStyle}>
                <Link to="/" style={menuItemStyle}>
                  blogs
                </Link>
                <Link to="/users" style={menuItemStyle}>
                  users
                </Link>
              </div>
              <div style={menuGroupStyle}>
                <div style={menuItemStyle}>
                  {user.name || user.username} logged in
                </div>
                <Button onClick={handleLogout}>logout</Button>
              </div>
            </div>
            <h2>blog app</h2>
            <Notification />
            <Switch>
              <Route path="/blogs/:id" component={BlogView} />
              <Route path="/users/:id" component={User} />
              <Route path="/users" component={Users} />
              <Route path="/">
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
