
import { useState, useEffect } from 'react'
import personService from '/root/repos/fullstackopen/part2/phonebook/src/services/persons'

const Filter = ({ onChange }) => (
  <div>
    filter shown with
    <input onChange={onChange} />
  </div>
)

const PersonForm = ({ newName, newNumber, onNameChange, onNumberChange, onSubmit }) => (
  <form onSubmit={onSubmit}>
    <div>
      name:
      <input value={newName} onChange={onNameChange} />
    </div>
    <div>
      number:
      <input value={newNumber} onChange={onNumberChange} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
)

const Persons = ({ persons }) => (
  <div>
    {persons.map(person => (
      <div key={person.id}>
        {person.name} {person.number}
      </div>
    ))}
  </div>
)

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filteredPersons, setFilteredPersons] = useState(persons)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setFilteredPersons(initialPersons)
        setPersons(initialPersons)
      })
  }, [])

  const newPerson = (e) => {
    e.preventDefault()
    if (alertExisting()) return

    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    }
    
    personService
      .create(personObject)
      .then(createdPerson => {
        setFilteredPersons(filteredPersons.concat(createdPerson))
        setNewName('')
        setNewNumber('')
      })
  }

  const alertExisting = () => {
    if (persons.some(person => person.name === newName)) {
      window.alert(`${newName} is already added to phonebook`)
      return true
    }
    return false
  }

  const nameFilter = (e) => {
    const searchTerm = e.target.value.toLowerCase()
    const filtered = persons.filter(person => {
      return person.name.toLowerCase().includes(searchTerm)
    })
    
    setFilteredPersons(filtered)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter onChange={nameFilter} />
      <h3>Add a new</h3>
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        onNameChange={(e) => setNewName(e.target.value)}
        onNumberChange={(e) => setNewNumber(e.target.value)}
        onSubmit={newPerson}
      />
      <h3>Numbers</h3>
      <Persons persons={filteredPersons} />
    </div>
  )
}

export default App
