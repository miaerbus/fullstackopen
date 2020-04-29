import blogService from '../services/blogs'

const likesDesc = (a, b) => b.likes - a.likes

const bloglistReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_BLOGLIST':
      return action.data.sort(likesDesc)

    case 'NEW_BLOG':
      return state.concat(action.data)

    case 'LIKE_BLOG':
      const updatedBlog = state.find((b) => b.id === action.data.id)

      const updatedState = state.map((b) =>
        b.id === action.data.id ? updatedBlog : b
      )

      return updatedState.sort(likesDesc)

    case 'DELETE_BLOG':
      return state.filter((b) => b.id !== action.data)

    default:
      return state
  }
}

export const initialize = () => {
  return async (dispatch) => {
    const bloglist = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGLIST',
      data: bloglist,
    })
  }
}

export const createBlog = (content) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(content)
    dispatch({
      type: 'NEW_BLOG',
      data: newBlog,
    })
  }
}

export const updateBlog = (blog) => {
  return async (dispatch) => {
    const newObject = {
      ...blog,
      likes: ++blog.likes,
    }
    const updatedBlog = await blogService.update(blog.id, newObject)
    dispatch({
      type: 'LIKE_BLOG',
      data: updatedBlog,
    })
  }
}

export const deleteBlog = (id) => {
  return async (dispatch) => {
    await blogService.deleteBlog(id)
    dispatch({
      type: 'DELETE_BLOG',
      data: id,
    })
  }
}

export default bloglistReducer
