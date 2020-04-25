import anecdoteService from '../services/anecdotes'

const votesDesc = (a, b) => b.votes - a.votes

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_ANECDOTES':
      return action.data.sort(votesDesc)

    case 'NEW_ANECDOTE':
      return [...state, action.data]

    case 'VOTE': {
      const updatedAnecodote = state.find(
        (anecdote) => anecdote.id === action.data.id
      )
      // TODO: change to ++votes, then can fix the voteFor action creator order ?
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

export const initialize = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })
  }
}

export const createNew = (content) => {
  return async (dispatch) => {
    const anecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: anecdote,
    })
  }
}

export const voteFor = (anecdote) => {
  return async (dispatch) => {
    const id = anecdote.id
    dispatch({
      type: 'VOTE',
      data: { id },
    })
    await anecdoteService.update(anecdote.id, anecdote)
  }
}

export default reducer
