import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useRouteMatch } from 'react-router-dom'
import { initializeUsers } from '../reducers/usersReducer'

const User = () => {
  const dispatch = useDispatch()
  const users = useSelector((state) => state.users)
  const match = useRouteMatch('/users/:id')
  const user = match ? users.find((user) => user.id === match.params.id) : null

  useEffect(() => {
    dispatch(initializeUsers())
  }, [dispatch])

  if (!user) return null

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default User
