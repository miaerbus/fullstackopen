import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  initializeBloglist,
  updateBlog,
  deleteBlog,
} from '../reducers/bloglistReducer'
import Blog from './Blog'

const Blogs = () => {
  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.bloglist)
  const user = useSelector((state) => state.user)

  useEffect(() => {
    dispatch(initializeBloglist())
  }, [dispatch])

  const handleLikeChange = async (blog) => {
    dispatch(updateBlog(blog))
  }

  const handleRemove = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      dispatch(deleteBlog(blog.id))
    }
  }

  return (
    <div>
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
  )
}

export default Blogs
