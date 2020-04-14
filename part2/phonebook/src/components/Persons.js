import React from 'react'
import Person from './Person'

const Persons = ({ persons, deleteName }) => {
  return persons.map((person) => (
    <Person key={person.id} person={person} deleteName={deleteName} />
  ))
}

export default Persons
