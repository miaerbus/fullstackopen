import React from 'react'

const Total = ({ parts }) => {
  return (
    <div>
      <b>
        total of exercises{' '}
        {parts.reduce((total, part) => {
          return total + part.exercises
        }, 0)}
      </b>
    </div>
  )
}

export default Total
