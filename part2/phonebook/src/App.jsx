import { useState } from 'react'

const DisplayPersons = ({ persons }) => {
  console.log('The persons looks like this', persons)
  return (
    <div>{persons.map(person => <div key={person.id}>{person.name} {person.number}</div>)}</div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filteredPersons, setFilteredPersons] = useState(persons)

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

  const nameFilter = (e) => {
    const searchTerm = e.target.value.toLowerCase()
    const filtered = persons.filter(person => person.name.toLowerCase().includes(searchTerm))
    setFilteredPersons(filtered)
  }
    

  return (
    <div>
      <h2>Phonebook</h2>
        <div>
          filter shown with
          <input 
            onChange={nameFilter} 
          />
        </div>
      <h2>add a new</h2>
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
      <DisplayPersons persons={filteredPersons} />
      ...
      <div>debug: {newName}</div>
    </div>
    
  )
}

export default App