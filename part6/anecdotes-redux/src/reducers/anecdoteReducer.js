const votesDesc = (a, b) => b.votes - a.votes

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_ANECDOTES':
      return action.data.sort(votesDesc)

    case 'NEW_ANECDOTE': {
      return [...state, action.data]
    }

    case 'VOTE': {
      const updatedAnecodote = state.find(
        (anecdote) => anecdote.id === action.data.id
      )
      updatedAnecodote.votes++

      const updatedState = state.map((anecdote) =>
        anecdote.id === action.data.id ? updatedAnecodote : anecdote
      )

      return updatedState.sort(votesDesc)
    }

    default:
      return state
  }
}

export const initialize = (anecdotes) => ({
  type: 'INIT_ANECDOTES',
  data: anecdotes,
})

export const createNew = (data) => ({
  type: 'NEW_ANECDOTE',
  data,
})

export const voteFor = (id) => ({
  type: 'VOTE',
  data: { id },
})

export default reducer
