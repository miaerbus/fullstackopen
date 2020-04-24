import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteFor } from '../reducers/anecdoteReducer'
import { showNotificationWithTimeout } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()

  const filter = useSelector((state) => state.filter)
  const anecdotes = useSelector((state) =>
    state.anecdotes.filter(
      (anecdote) =>
        anecdote.content.toLowerCase().indexOf(filter.toLowerCase()) > -1
    )
  )

  const vote = (anecdote) => {
    console.log('vote', anecdote)
    dispatch(voteFor(anecdote.id))
    dispatch(showNotificationWithTimeout(`you voted for '${anecdote.content}'`))
  }

  return (
    <div>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default AnecdoteList
