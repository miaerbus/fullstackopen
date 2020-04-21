import React, { useState } from 'react'

const Blog = ({ blog, user, handleRemove, handleLikeChange }) => {
  const [visible, setVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const handleVisibility = () => {
    return setVisible(!visible)
  }

  return (
    <div className="blog" style={blogStyle}>
      <div className="title-author">
        {blog.title} {blog.author}
        <button onClick={handleVisibility}>{visible ? 'hide' : 'view'}</button>
      </div>
      {visible && (
        <div>
          <div className="url">{blog.url}</div>
          <div className="likes">
            {blog.likes}
            <button onClick={() => handleLikeChange(blog)}>like</button>
          </div>
          <div className="user">{blog.user && blog.user.name}</div>
          {blog.user && blog.user.username === user.username && (
            <button onClick={() => handleRemove(blog)}>remove</button>
          )}
        </div>
      )}
    </div>
  )
}

export default Blog
