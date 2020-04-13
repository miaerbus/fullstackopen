import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Countries from './components/Countries'

const App = () => {
  const [countries, setCountries] = useState([])
  const [filteredName, setFilteredName] = useState('')

  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all').then((response) => {
      setCountries(response.data)
    })
  })

  const handleFilterChange = (event) => {
    setFilteredName(event.target.value)
  }

  const handleShowCountry = (name) => {
    setFilteredName(name)
  }

  const countriesFiltered =
    filteredName !== ''
      ? countries.filter(
          (country) =>
            country.name.toLowerCase().indexOf(filteredName.toLowerCase()) > -1
        )
      : []

  return (
    <div>
      find countries
      <input value={filteredName} onChange={handleFilterChange} />
      <Countries countries={countriesFiltered} handleShowCountry={handleShowCountry} />
    </div>
  )
}
export default App
