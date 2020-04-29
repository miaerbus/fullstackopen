import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import bloglistReducer from './reducers/bloglistReducer'
import notificationReducer from './reducers/notificationReducer'
import loginReducer from './reducers/loginReducer'

const reducer = combineReducers({
  bloglist: bloglistReducer,
  notification: notificationReducer,
  user: loginReducer,
})

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))

export default store
