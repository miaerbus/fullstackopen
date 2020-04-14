import React, { useState, useEffect } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import noteService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filteredName, setFilteredName] = useState('')

  useEffect(() => {
    noteService.getAll().then((persons) => {
      setPersons(persons)
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

    noteService.create(personObject).then((returnedPerson) => {
      setPersons(persons.concat(returnedPerson))
      setNewName('')
      setNewNumber('')
    })
  }

  const deleteName = (id) => {
    noteService
      .deletePerson(id)
      .then(() => {
        setPersons(persons.filter((p) => p.id !== id))
      })
      .catch((error) => {
        alert(error)
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
      <Persons persons={personsFiltered} deleteName={deleteName} />
    </div>
  )
}

export default App
