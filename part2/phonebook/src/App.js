import React, { useState } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'

const App = () => {
  const [persons, setPersons] = useState([
    { id: 1, name: 'Arto Hellas', number: '040-123456' },
    { id: 2, name: 'Ada Lovelace', number: '39-44-5323523' },
    { id: 3, name: 'Dan Abramov', number: '12-43-234345' },
    { id: 4, name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filteredName, setFilteredName] = useState('')

  const addName = (event) => {
    event.preventDefault()
    const personObject = {
      id: persons.length + 1,
      name: newName,
      number: newNumber
    }

    if (persons.some((person) => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
      return
    }

    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')
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

  const personsFiltered = filteredName !== ''
    ? persons.filter((person) => person.name.toLowerCase().indexOf(filteredName.toLowerCase()) > -1)
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
