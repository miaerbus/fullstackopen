import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createNew } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {
  const [name, setName] = useState('')
  const dispatch = useDispatch()

  const addNew = (event) => {
    event.preventDefault()
    dispatch(createNew(name))
  }

  const handleNameChange = (event) => {
    setName(event.target.value)
  }
  return (
    <div>
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

export default AnecdoteForm
