import loginService from '../services/login'
import blogService from '../services/blogs'

const reducer = (state = null, action) => {
  switch (action.type) {
    case 'LOGIN': {
      return action.data
    }

    case 'LOGIN_WITH_LOCALSTORAGE': {
      return action.data
    }

    case 'LOGOUT': {
      return null
    }

    default:
      return state
  }
}

export const login = (username, password) => {
  return async (dispatch) => {
    const user = await loginService.login({ username, password })
    window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
    await blogService.setToken(user.token)
    dispatch({
      type: 'LOGIN',
      data: user,
    })
  }
}

export const loginWithLocalstorage = () => {
  return async (dispatch) => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (!loggedUserJSON) {
      return
    }
    const user = JSON.parse(loggedUserJSON)
    await blogService.setToken(user.token)
    dispatch({
      type: 'LOGIN_WITH_LOCALSTORAGE',
      data: user,
    })
  }
}

export const logout = () => {
  window.localStorage.removeItem('loggedBlogappUser')
  return {
    type: 'LOGOUT',
  }
}

export default reducer
