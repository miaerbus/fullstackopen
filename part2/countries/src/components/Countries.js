import React from 'react'
import Country from './Country'

const Countries = ({ countries, handleShowCountry }) => {
  if (countries.length === 1) {
    return countries.map((country, i) => <Country key={i} country={country} />)
  }
  if (countries.length > 10) {
    return <div>Too many matches, specify another filter</div>
  }

  return countries.map((country, i) => (
    <div>
      <div key={i}>
        {country.name}
        <button onClick={() => handleShowCountry(country.name)}>show</button>
      </div>
    </div>
  ))
}

export default Countries
