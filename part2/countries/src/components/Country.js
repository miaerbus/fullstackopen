import React from 'react'

const Country = ({ country }) => {
  const languages = country.languages.map((lang, i) => {
    return <li key={i}>{lang.name}</li>
  })

  return (
    <div>
      <h1>{country.name}</h1>
      <div>capital {country.capital}</div>
      <div>population {country.population}</div>
      <h2>languages</h2>
      <ul>{languages}</ul>
      <img src={country.flag} alt={country.name} width="400" />
    </div>
  )
}

export default Country
