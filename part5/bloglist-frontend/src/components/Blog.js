import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, user, handleRemove }) => {
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
      likes: blog.likes++,
    }
    const updatedBlog = await blogService.update(blog.id, newObject)
    setUpdatedBlog(updatedBlog)
  }

  const handleVisibility = () => {
    return setVisible(!visible)
  }

  return (
    <div className="blog" style={blogStyle}>
      <div className="title-author">
        {blog.title} {blog.author}
        <button onClick={handleVisibility}>
          {visible ? 'hide' : 'view'}
        </button>
      </div>
      {visible && (
        <div>
          <div className="url">{blog.url}</div>
          <div className="likes">
            {updatedBlog.likes} <button onClick={handleLikeChange}>like</button>
          </div>
          <div>{blog.user && blog.user.name}</div>
          {blog.user && blog.user.username === user.username && (
            <button onClick={() => handleRemove(blog)}>remove</button>
          )}
        </div>
      )}
    </div>
  )
}

export default Blog
