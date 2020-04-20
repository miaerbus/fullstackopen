import React, { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const onSubmit = (event) => {
    event.preventDefault()
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    }
    createBlog(blogObject)
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  return (
    <form onSubmit={onSubmit}>
      <div>
        <label>title:</label>
        <input
          value={newTitle}
          onChange={(event) => setNewTitle(event.target.value)}
        />
      </div>
      <div>
        <label>author:</label>
        <input
          value={newAuthor}
          onChange={(event) => setNewAuthor(event.target.value)}
        />
      </div>
      <div>
        <label>url:</label>
        <input
          value={newUrl}
          onChange={(event) => setNewUrl(event.target.value)}
        />
      </div>
      <button type="submit">create</button>
    </form>
  )
}

export default BlogForm
