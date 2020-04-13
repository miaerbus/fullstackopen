import React from 'react'
import Weather from './Weather'

const Country = ({ country }) => {
  const languages = country.languages.map((lang, i) => {
    return <li key={lang.iso639_1}>{lang.name}</li>
  })

  return (
    <div>
      <h1>{country.name}</h1>
      <div>capital {country.capital}</div>
      <div>population {country.population}</div>
      <h2>languages</h2>
      <ul>{languages}</ul>
      <img src={country.flag} alt={country.name} width="400" />
      <h2>Weather in {country.capital}</h2>
      <Weather capital={country.capital} />
    </div>
  )
}

export default Country
