import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import countriesService from './services/countries.js'

const Filter = ({ onChange }) => {
  return (
    <>
      find countries <input onChange={onChange}/>
    </>
  )
}

const Results = ({ filteredCountries }) => {
  if (filteredCountries.length === 1) {

    return (
      <>
        <h1>{filteredCountries[0].name.common}</h1>
        <div>Capital {filteredCountries[0].capital}</div>
        <div>Area {filteredCountries[0].area}</div>
        <h2>Languages:</h2>
        <ul>
          {Object.values(filteredCountries[0].languages).map(language => (
            <li key={language}>{language}</li>
          ))}
        </ul>
        <img src={filteredCountries[0].flags.png}></img>
      </>
    )
  }
  if (filteredCountries.length >= 10) {
    return (
      <div>Too many matches, specify another filter</div>
    )
  }
  return (
    <>
      {filteredCountries.map(country => (
        <div key={country.name.common}>{country.name.common}</div>
      ))}
    </>
  )
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])

  useEffect(() => {
    countriesService
      .getAll()
      .then(allCountries => {
        setCountries(allCountries)
      })
  }, [])

  const nameFilter = (e) => {
    const searchTerm = e.target.value.toLowerCase()
    const filtered = countries.filter(country => {
      return country.name.common.toLowerCase().includes(searchTerm)
    })
    setFilteredCountries(filtered)
    if (searchTerm.length < 1) return setFilteredCountries([])
  }

  return (
    <div>
      <Filter onChange={nameFilter} />
      <Results filteredCountries={filteredCountries}/>
    </div>
  )
}

export default App