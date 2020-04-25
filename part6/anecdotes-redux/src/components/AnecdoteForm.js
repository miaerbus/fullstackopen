import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createNew } from '../reducers/anecdoteReducer'
import { showNotificationWithTimeout } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const [name, setName] = useState('')
  const dispatch = useDispatch()

  const addNew = async (event) => {
    event.preventDefault()
    dispatch(createNew(name))
    dispatch(showNotificationWithTimeout(`you created '${name}'`))
    setName('')
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
