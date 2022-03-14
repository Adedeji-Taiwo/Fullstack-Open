import { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons"; 



function App() {
  const [persons, setPersons] = useState([]);

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");

  const hook = () => {
    axios
      .get("http://localhost:3001/persons")
      .then(res => {
        setPersons(res.data)
      })
  }

  useEffect(hook, []);


  const handleNameChange = (e) => {
    setNewName(e.target.value)
  }

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value)
  }


  
  const addName = (e) => {
    e.preventDefault();

    const createNew = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }

    persons.some(person => person.name === createNew.name) ? alert(`${newName} is already added to phonebook`) : setPersons(persons.concat(createNew));
    setNewName("");
    setNewNumber(""); 
  
  }


  const handleSearch = (e) => {
   const value = e.target.value;
    setSearch(value);
  
  }

const filtered = persons.filter(person => person.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="App">
      <h2>Phonebook</h2>
       <Filter search={search} handleSearch={handleSearch}/>
      <h3>Add a New Contact</h3>
      <PersonForm 
        newName={newName}
        addName={addName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons filtered={filtered}/>
    </div>
  );
}

export default App;
