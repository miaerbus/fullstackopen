import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false)
  const [updatedBlog, setUpdatedBlog] = useState(blog)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const handleLikeChange = async () => {
    const newObject = {
      ...blog,
      likes: blog.likes + 1,
    }
    const updatedBlog = await blogService.update(blog.id, newObject)
    setUpdatedBlog(updatedBlog)
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button onClick={() => setVisible(!visible)}>
          {visible ? 'hide' : 'view'}
        </button>
      </div>
      {visible && (
        <div>
          <div>{blog.url}</div>
          <div>
            {updatedBlog.likes} <button onClick={handleLikeChange}>like</button>
          </div>
          <div>{blog.user && blog.user.name}</div>
        </div>
      )}
    </div>
  )
}

export default Blog
