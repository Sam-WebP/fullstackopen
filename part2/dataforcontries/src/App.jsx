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

const CountryDetails = ({ filteredCountries }) => {
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

const Results = ({ filteredCountries, onShowDetails }) => {
  if (filteredCountries.length === 1) {
    return (
      <CountryDetails filteredCountries={filteredCountries}/>
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
        <div key={country.name.common}>
          {country.name.common} 
          <button onClick={() => onShowDetails(country)}>show</button>
        </div>
      ))}
    </>
  )
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    countriesService
      .getAll()
      .then(allCountries => {
        setCountries(allCountries)
      })
  }, [])

  const handleShowDetails = (country) => {
    setSelectedCountry(country);
  };

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
      <Results filteredCountries={filteredCountries} onShowDetails={handleShowDetails} />
      {selectedCountry && <CountryDetails filteredCountries={[selectedCountry]} />}
    </div>
  )
}

export default App