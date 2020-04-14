import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filteredName, setFilteredName] = useState('')

  useEffect(() => {
    axios.get('http://localhost:3001/persons').then((response) => {
      setPersons(response.data)
    })
  }, [])

  const addName = (event) => {
    event.preventDefault()
    const personObject = {
      id: persons.length + 1,
      name: newName,
      number: newNumber,
    }

    if (persons.some((person) => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
      return
    }

    axios.post('http://localhost:3001/persons', personObject).then(() => {
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
    })
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilteredName(event.target.value)
  }

  const personsFiltered =
    filteredName !== ''
      ? persons.filter(
          (person) =>
            person.name.toLowerCase().indexOf(filteredName.toLowerCase()) > -1
        )
      : persons

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        filteredName={filteredName}
        handleFilterChange={handleFilterChange}
      />
      <h2>add a new</h2>
      <PersonForm
        addName={addName}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons persons={personsFiltered} />
    </div>
  )
}

export default App
