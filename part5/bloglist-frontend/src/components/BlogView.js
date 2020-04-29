import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useRouteMatch } from 'react-router-dom'
import {
  initializeBloglist,
  updateBlog,
  addComment,
} from '../reducers/bloglistReducer'

const BlogView = () => {
  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.bloglist)
  const match = useRouteMatch('/blogs/:id')
  const blog = match ? blogs.find((blog) => blog.id === match.params.id) : null

  const [newComment, setNewComment] = useState('')

  useEffect(() => {
    dispatch(initializeBloglist())
  }, [dispatch])

  const handleLikeChange = async () => {
    dispatch(updateBlog(blog))
  }

  const onSubmit = (event) => {
    event.preventDefault()
    const comment = {
      content: newComment,
    }
    dispatch(addComment(blog, comment))
    setNewComment('')
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
      <h3>comments</h3>
      <form onSubmit={onSubmit}>
        <input
          id="comment"
          value={newComment}
          onChange={(event) => setNewComment(event.target.value)}
        />
        <button id="add-comment" type="submit">
          add comment
        </button>
      </form>

      <ul>
        {blog.comments.map((comment) => (
          <li key={comment._id}>{comment.content}</li>
        ))}
      </ul>
    </div>
  )
}

export default BlogView
