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
    <form onSubmit={addNew}>
      <div>
        <input value={name} onChange={handleNameChange} />
      </div>
      <button type="submit">create</button>
    </form>
  )
}

export default AnecdoteForm
