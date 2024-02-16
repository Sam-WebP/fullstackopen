import { useState } from 'react'

const DisplayPersons = ({ persons }) => {
  console.log('The persons looks like this', persons)
  return (
    <div>{persons.map(person => <div key={person.name}>{person.name}</div>)}</div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const newPerson = (e) => {
    e.preventDefault()
    if (alertExisting()) {
      setNewName('')
      return
    }
    const personObject = {
      name: newName,
    }
    setPersons(persons.concat(personObject))
    setNewName('')
  }

  const alertExisting = () => {
    if (persons.map(person => person.name).includes(newName)) {
      window.alert(`${newName} is already added to phonebook`)
      return true
    }
  }

  const handlePersonChange = (e) => {
    console.log(e.target.value)
    setNewName(e.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={newPerson}>
        <div>
          name: 
          <input
            value={newName}
            onChange={handlePersonChange}
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