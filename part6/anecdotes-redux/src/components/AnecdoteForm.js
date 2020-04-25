import React, { useState } from 'react'
import { connect } from 'react-redux'
import { createNew } from '../reducers/anecdoteReducer'
import { showNotificationWithTimeout } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
  const [name, setName] = useState('')

  const addNew = async (event) => {
    event.preventDefault()
    props.createNew(name)
    props.showNotificationWithTimeout(`you created '${name}'`, 5)
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

const mapDispatchToProps = {
  createNew,
  showNotificationWithTimeout,
}

const ConnectedAnecdoteForm = connect(null, mapDispatchToProps)(AnecdoteForm)
export default ConnectedAnecdoteForm
