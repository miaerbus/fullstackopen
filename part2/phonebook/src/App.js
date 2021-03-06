import React, { useState, useEffect } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Notification from './components/Notification'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filteredName, setFilteredName] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [className, setClassName] = useState('')

  useEffect(() => {
    personService.getAll().then((persons) => {
      setPersons(persons)
    })
  }, [])

  const addName = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
    }

    const personAlreadyExists = persons.some((p) => p.name === newName)

    if (personAlreadyExists) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        const person = persons.find((p) => p.name === newName)
        const updatedPerson = { ...person, number: newNumber }

        personService
          .update(person.id, updatedPerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person.name !== newName ? person : returnedPerson
              )
            )
            setNewName('')
            setNewNumber('')
            setClassName('success')
            setNotificationMessage(
              `Updated ${returnedPerson.name}'s phone number`
            )
            setTimeout(() => {
              setNotificationMessage(null)
            }, 5000)
          })
      }
      return
    }

    personService
      .create(personObject)
      .then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
        setClassName('success')
        setNotificationMessage(`Added ${returnedPerson.name}`)
        setTimeout(() => {
          setNotificationMessage(null)
        }, 5000)
      })
      .catch((error) => {
        // this is the way to access the error message
        console.log(error.response.data.error)
        setClassName('error')
        setNotificationMessage(error.response.data.error)
        setTimeout(() => {
          setNotificationMessage(null)
        }, 5000)
      })
  }

  const deleteName = (id) => {
    personService
      .deletePerson(id)
      .then(() => {
        setPersons(persons.filter((p) => p.id !== id))
      })
      .catch(() => {
        const deletedPerson = persons.filter((p) => p.id === id)
        setClassName('error')
        setNotificationMessage(
          `${deletedPerson.name} was already deleted from server`
        )
        setTimeout(() => {
          setNotificationMessage(null)
        }, 5000)
        setPersons(persons.filter((p) => p.id !== id))
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
      <Notification message={notificationMessage} className={className} />
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
