const reducer = (state = '', action) => {
  switch (action.type) {
    case 'SHOW_NOTIFICATION': {
      return action.data.text
    }

    case 'HIDE_NOTIFICATION': {
      return ''
    }

    default:
      return state
  }
}

export const showNotification = (id, text) => {
  return {
    type: 'SHOW_NOTIFICATION',
    data: { id, text },
  }
}

export const hideNotification = (id) => {
  return {
    type: 'HIDE_NOTIFICATION',
    data: { id },
  }
}

// https://stackoverflow.com/questions/35411423/how-to-dispatch-a-redux-action-with-a-timeout
let nextNotificationId = 0
export const showNotificationWithTimeout = (text, time) => {
  return (dispatch) => {
    const id = nextNotificationId++
    dispatch(showNotification(id, text))

    setTimeout(() => {
      // hide the notification if it is the last one in queue, no other notifications are pending
      if (id === nextNotificationId - 1) {
        dispatch(hideNotification(id))
      }
    }, time * 1000)
  }
}

export default reducer
