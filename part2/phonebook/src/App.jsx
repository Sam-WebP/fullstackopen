
import { useState, useEffect } from 'react'
import personService from '/src/services/persons.js'

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

const Persons = ({ persons, deletePerson }) => (
  <div>
    {persons.map(person => (
      <div key={person.id}>
        {person.name} {person.number} <button onClick={() => deletePerson(person.id, person.name)}>delete</button>
      </div>
    ))}
  </div>
)

const Notification = ({ message, duration }) => {
  if (message === '') {
    return null
  }

  const notiStyle = {
    color: 'green',
    fontSize: 20,
    padding: '15px',
  }

  return (
    <div style={notiStyle}>
      {message}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filteredPersons, setFilteredPersons] = useState(persons)
  const [message, setMessage] = useState('')

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
    }
    personService
      .create(personObject)
      .then(createdPerson => {
        setFilteredPersons(filteredPersons.concat(createdPerson))
        setPersons(persons.concat(createdPerson))
        setNewName('')
        setNewNumber('')
        setMessage(`Added ${personObject.name}`)
        setTimeout(() => setMessage(''), 3000)
      })
      .catch(error => {
        console.log(`Error creating ${personObject.name}`, error)
      })
  }

  const deletePerson = (id, name) => {
    if (window.confirm(`Delete ${name}`)) {
      personService
        .deleteRecord(id)
        .then(() => 
          setFilteredPersons(filteredPersons.filter(p => p.id !== id)),
          setPersons(persons.filter(p => p.id !== id))
        )
        .catch(error => {
          console.log('Error deleting the person', error);
        })
    }
  }

  const alertExisting = () => {
    if (persons.some(person => person.name === newName)) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const existingMatch = filteredPersons.find(person => person.name === newName)
        const updatedPerson = { ...existingMatch, number: newNumber }
        personService
          .update(updatedPerson.id, updatedPerson)
          .then(returnedValue => 
            setFilteredPersons(persons.map(p => 
              p.id !== existingMatch.id ? p : returnedValue)
            )
          )
          .catch(error => {
            setMessage(`Information of ${newName} has already been removed from sever`)
            //return true
            console.log(message)
          })
        setMessage(`${newName}'s number has been changed to ${newNumber}`)
        setTimeout(() => setMessage(''), 6000)
      }
      setNewName('')
      setNewNumber('')
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
      <Notification message={message}/>
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
      <Persons persons={filteredPersons} deletePerson={deletePerson} />
    </div>
  )
}

export default App
