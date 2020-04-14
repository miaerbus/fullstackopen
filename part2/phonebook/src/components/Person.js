import React from 'react'

const Person = ({ person, deleteName }) => {
  const deleteConfirm = () => {
    if (window.confirm(`Do you really want to delete ${person.name}?`)) {
      deleteName(person.id)
    }
  }

  return (
    <div>
      {person.name} {person.number}
      <button onClick={deleteConfirm}>delete</button>
    </div>
  )
}

export default Person
