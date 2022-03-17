import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons"; 
import personService from "./services/persons";
import NotFound from "./components/NotFound";
import Notification from "./components/Notification";


function App() {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState(null);


  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => setPersons(initialPersons))
  }, []);


  
  const addName = (e) => {
    e.preventDefault();

    const maxId = persons.length > 0 
    ? Math.max(...persons.map(n => n.id))
    : 0

    const createNew = {
      name: newName,
      number: newNumber,
      id: maxId + 1
    }

    
    if (persons.some(person => person.name === createNew.name)) {
       if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
         const person = persons.find(n => n.name === createNew.name);
         const changePerson ={...person, number: createNew.number};
          const id = person.id;
         

          personService
            .update(id, changePerson)
            .then(returnedPerson => {
             setPersons( persons.map(person => person.id !== id ? person : returnedPerson));
             setMessage(`${returnedPerson.name}'s number is updated`)
              setTimeout(() => {
                setMessage(null)
              }, 5000)
            })
            .catch(error => {
               setMessage(`Information of ${changePerson.name} has already been removed from server`)
              setTimeout(() => {
                setMessage(null)
              }, 5000)

              setPersons(persons.filter(n => n.id !== id))
            })
       }
    }
    else {
       return  personService
          .create(createNew).then(returnedPerson => {
            setPersons(persons.concat(returnedPerson)); 
            setMessage(`Added ${returnedPerson.name}`)
            setTimeout(() => {
              setMessage(null)
            }, 5000)
          })
          
    }
     setNewName("");
      setNewNumber("");
  }

   

  const handleRemoval = (id) => {
    const person = persons.find(n => n.id === id);
    const deletePerson = {...person};

    if (window.confirm(`Delete ${deletePerson.name}?`)) {
    personService
      .remove(id, deletePerson)
      .catch(error => {
               setMessage(`Information of ${deletePerson.name} has already been removed from server`)
              setTimeout(() => {
                setMessage(null)
              }, 5000)
              
              setPersons(persons.filter(n => n.id !== id))
            })

        setPersons(persons.filter(n => n.id !== deletePerson.id))
    }

    
    setMessage(`Deleted ${deletePerson.name}`)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
           
  }



  const handleNameChange = (e) => {
    setNewName(e.target.value)
  }

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value)
  }

  const handleSearch = (e) => {
   const value = e.target.value;
    setSearch(value);
  
  }



const filtered = persons.filter(person => person.name.toLowerCase().includes(search.toLowerCase()));


const renderFiltered =  filtered.length > 0 ? (
          filtered.map(person => 
          <Persons 
            key = {person.id} 
            person={person} 
            handleRemoval = {() => handleRemoval(person.id)}/>  
          )
        ) : (
          <NotFound message="No matches found"/>
        ) 


  return (
    <div className="App">
      <h2>Phonebook</h2>
      <Notification message={message}/>
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
      <div>
        {(persons.length > 0) ? (
          renderFiltered
       ) : (
           <NotFound message="Phonebook empty! Add a contact"/>
        )}
      </div>
    </div>
  );
}

export default App;
