import React from 'react'
import { connect, useDispatch } from 'react-redux'
import { voteFor } from '../reducers/anecdoteReducer'
import { showNotificationWithTimeout } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
  const dispatch = useDispatch()

  const vote = async (anecdote) => {
    dispatch(voteFor(anecdote))
    dispatch(
      showNotificationWithTimeout(`you voted for '${anecdote.content}'`, 10)
    )
  }

  return (
    <div>
      {props.anecdotes.map((anecdote) => (
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

const mapStateToProps = (state) => {
  // sometimes it is useful to console log from mapStateToProps
  console.log(state)
  return {
    anecdotes: state.anecdotes.filter(
      (anecdote) =>
        anecdote.content.toLowerCase().indexOf(state.filter.toLowerCase()) > -1
    ),
    filter: state.filter,
  }
}

const ConnectedAnecdoteList = connect(mapStateToProps)(AnecdoteList)
export default ConnectedAnecdoteList
