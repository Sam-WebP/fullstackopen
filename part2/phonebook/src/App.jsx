import { useState } from 'react'

const DisplayPersons = ({ persons }) => {
  console.log('The persons looks like this', persons)
  return (
    <div>{persons.map(person => <div key={person.name}>{person.name} {person.number}</div>)}</div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas',
      number: '0401 938 332'
    }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const defaultState = () => {
    setNewName('')
    setNewNumber('')
  }

  const newPerson = (e) => {
    e.preventDefault()
    if (alertExisting()) {
      defaultState()
      return
    }
    const personObject = {
      name: newName,
      number: newNumber
    }
    setPersons(persons.concat(personObject))
    defaultState()
  }

  const alertExisting = () => {
    if (persons.map(person => person.name).includes(newName)) {
      window.alert(`${newName} is already added to phonebook`)
      return true
    }
  }

  const handleNameChange = (e) => {
    console.log(e.target.value)
    setNewName(e.target.value)
  }

  const handleNumberChange = (e) => {
    console.log(e.target.value)
    setNewNumber(e.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={newPerson}>
        <div>
          name: 
          <input
            value={newName}
            onChange={handleNameChange}
          />
        </div>
        <div>
          number:
          <input
          value={newNumber}
          onChange={handleNumberChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <DisplayPersons persons={persons} />
      ...
      <div>debug: {newName}</div>
    </div>
    
  )
}

export default App