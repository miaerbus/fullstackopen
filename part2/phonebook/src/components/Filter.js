import React from 'react'

const Filter = (props) => (
  <div>
    filter shown with input{' '}
    <input value={props.filteredName} onChange={props.handleFilterChange} />
  </div>
)

export default Filter
