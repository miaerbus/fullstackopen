import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteFor, createNew } from './reducers/anecdoteReducer'

const App = () => {
  const anecdotes = useSelector((state) => state)
  const dispatch = useDispatch()
  const [name, setName] = useState('')

  const vote = (id) => {
    console.log('vote', id)
    dispatch(voteFor(id))
  }

  const addNew = (event) => {
    event.preventDefault()
    dispatch(createNew(name))
  }

  const handleNameChange = (event) => {
    setName(event.target.value)
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
      <h2>create new</h2>
      <form onSubmit={addNew}>
        <div>
          <input value={name} onChange={handleNameChange} />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default App
