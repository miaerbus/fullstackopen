import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useRouteMatch } from 'react-router-dom'
import { initializeBloglist, updateBlog } from '../reducers/bloglistReducer'

const BlogView = () => {
  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.bloglist)
  const match = useRouteMatch('/blogs/:id')
  const blog = match ? blogs.find((blog) => blog.id === match.params.id) : null

  useEffect(() => {
    dispatch(initializeBloglist())
  }, [dispatch])

  const handleLikeChange = async () => {
    dispatch(updateBlog(blog))
  }

  if (!blog) return null

  return (
    <div>
      <h2>{blog.title}</h2>
      <a href={blog.url}>{blog.url}</a>
      <div>
        {blog.likes} likes
        <button onClick={() => handleLikeChange()}>like</button>
      </div>
      <div>added by {blog.author}</div>
    </div>
  )
}

export default BlogView
