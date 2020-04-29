import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { BrowserRouter as Route, Link } from 'react-router-dom'
import { initializeBloglist } from '../reducers/bloglistReducer'
// import Blog from './Blog'
import BlogView from './BlogView'

const Blogs = () => {
  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.bloglist)

  useEffect(() => {
    dispatch(initializeBloglist())
  }, [dispatch])

  // const handleRemove = async (blog) => {
  //   if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
  //     dispatch(deleteBlog(blog.id))
  //   }
  // }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  return (
    <div>
      {blogs.map((blog) => (
        <div className="blog" style={blogStyle} key={blog.id}>
          <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
        </div>
      ))}
      <Route path={'/blogs/:id'} component={BlogView} />
    </div>
  )
}

export default Blogs
