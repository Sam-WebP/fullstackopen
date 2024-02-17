import { useState } from 'react';

const Filter = ({ onChange }) => (
  <div>
    filter shown with
    <input onChange={onChange} />
  </div>
);

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
);

const Persons = ({ persons }) => (
  <div>
    {persons.map(person => (
      <div key={person.id}>
        {person.name} {person.number}
      </div>
    ))}
  </div>
);

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 },
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filteredPersons, setFilteredPersons] = useState(persons);

  const newPerson = (e) => {
    e.preventDefault();
    if (alertExisting()) return

    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    };
    setPersons(persons.concat(personObject));
    setFilteredPersons(persons.concat(personObject));
    setNewName('');
    setNewNumber('');
  };

  const alertExisting = () => {
    if (persons.some(person => person.name === newName)) {
      window.alert(`${newName} is already added to phonebook`);
      return true;
    }
    return false;
  };

  const handleNameChange = (e) => setNewName(e.target.value);
  const handleNumberChange = (e) => setNewNumber(e.target.value);

  const nameFilter = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filtered = persons.filter(person => person.name.toLowerCase().includes(searchTerm));
    setFilteredPersons(filtered);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter onChange={nameFilter} />
      <h3>Add a new</h3>
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        onNameChange={handleNameChange}
        onNumberChange={handleNumberChange}
        onSubmit={newPerson}
      />
      <h3>Numbers</h3>
      <Persons persons={filteredPersons} />
    </div>
  );
};

export default App;
