import React, { useState, useEffect } from 'react'
import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const reset = () => {
    setValue('')
  }

  return {
    type,
    value,
    onChange,
    reset,
  }
}

const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])

  let token = null

  const setToken = (newToken) => {
    token = `bearer ${newToken}`
  }

  useEffect(() => {
    axios
      .get(baseUrl)
      .then((response) => setResources(response.data))
      .catch(() => setResources([]))
  }, [baseUrl])

  const getAll = async () => {
    axios
      .get(baseUrl)
      .then((response) => setResources(response.data))
      .catch(() => setResources([]))
  }

  const create = async (newObject) => {
    const config = {
      headers: { Authorization: token },
    }

    const response = await axios.post(baseUrl, newObject, config)
    return response.data
  }

  const update = (id, newObject) => {
    const request = axios.put(`${baseUrl} /${id}`, newObject)
    return request.then((response) => response.data)
  }

  const service = {
    getAll,
    create,
    update,
    setToken,
  }

  return [resources, service]
}

const App = () => {
  const content = useField('text')
  const name = useField('text')
  const number = useField('text')

  let [notes, noteService] = useResource('http://localhost:3005/notes')
  const [persons, personService] = useResource('http://localhost:3005/persons')

  const handleNoteSubmit = async (event) => {
    event.preventDefault()
    if (!content.value) return
    await noteService.create({ content: content.value })
    await noteService.getAll()
    content.reset()
  }

  const handlePersonSubmit = async (event) => {
    event.preventDefault()
    if (!name.value || !number.value) return
    await personService.create({ name: name.value, number: number.value })
    await personService.getAll()
    name.reset()
    number.reset()
  }

  const withoutReset = ({ reset, ...rest }) => rest

  return (
    <div>
      <h2>notes</h2>
      <form onSubmit={handleNoteSubmit}>
        <input {...withoutReset(content)} />
        <button>create</button>
      </form>
      {notes.map((n) => (
        <p key={n.id}>{n.content}</p>
      ))}

      <h2>persons</h2>
      <form onSubmit={handlePersonSubmit}>
        name <input {...withoutReset(name)} /> <br />
        number <input {...withoutReset(number)} />
        <button>create</button>
      </form>
      {persons.map((n) => (
        <p key={n.id}>
          {n.name} {n.number}
        </p>
      ))}
    </div>
  )
}

export default App
