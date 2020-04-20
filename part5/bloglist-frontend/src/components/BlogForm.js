import React from 'react'

const NoteForm = ({
  onSubmit,
  handleTitleChange,
  handleAuthorChange,
  handleUrlChange,
  newTitle,
  newAuthor,
  newUrl,
}) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        <label>title:</label>
        <input value={newTitle} onChange={handleTitleChange} />
      </div>
      <div>
        <label>author:</label>
        <input value={newAuthor} onChange={handleAuthorChange} />
      </div>
      <div>
        <label>url:</label>
        <input value={newUrl} onChange={handleUrlChange} />
      </div>
      <button type="submit">create</button>
    </form>
  )
}

export default NoteForm
