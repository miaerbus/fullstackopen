import React from 'react'
import Country from './Country'

const Countries = ({ countries }) => {
    if (countries.length > 10) {
        return <div>Too many matches, specify another filter</div>
    } else if (countries.length === 1) {
        return countries.map((country) => <Country key={country.numericCode} country={country}/>)
    }
    return countries.map((country) => <div key={country.numericCode}>{country.name}</div>)
}

export default Countries
