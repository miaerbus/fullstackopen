const reducer = (state = 'INIT STATE', action) => {
  console.log('[notification] state now: ', state)
  console.log('[notification] action', action)

  return state
}

export default reducer
