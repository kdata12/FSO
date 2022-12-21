import { useState, useEffect } from 'react'
import {Person, PersonForm, Filter} from './components/phoneComp'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '480-201-392', id: 1 }
  ])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [showPerson, setShowPerson] = useState('')
  const [showPersonBool, setShowPersonBool] = useState(false)

  const hook = () => {
    axios
      .get("http://localhost:3000/persons")
      .then(response => {
        setPersons(response.data)
      })
  }

  useEffect(hook, [])

  const personToShow = showPersonBool ? persons.filter(person => person.name.toLowerCase() === showPerson.toLowerCase()) : persons

  /* On submission: Add input value to persons array state */
  const addPerson = (event) => {
    event.preventDefault() //stop from refresh
    const newPerson = {
      name: newName,
      number: newPhone
    }

    if (checkDuplicate(newPerson)) {
      return;
    }

    setPersons([...persons, newPerson]) //copy list and add new person
    setNewName('') //reset newName to blank
    setNewPhone('')
  }

  const checkDuplicate = (newPerson) => {
    for (let person of persons) {
      if (person.name === newPerson.name) {
        alert(`${newPerson.name} is already added to phonebook`)
        return true
      }
    }
  }

  const changeName = (event) => {
    setNewName(event.target.value) //set newName to the text currently in the input box
  }

  const changePhone = (event) => {
    setNewPhone(event.target.value)
  }

  const setShow = (event) => {
    setShowPerson(event.target.value)
    setShowPersonBool(event.target.value.length > 0)
  }

  //if showPersonBool is false then show everyone
  //else only show requested names

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={showPerson} onChange={setShow} />
      <h3>Add a new person</h3>
      <PersonForm onSubmit={addPerson} values={[newName, newPhone]} onChange={[changeName, changePhone]} />
      <h2>Numbers</h2>
      <Person persons={personToShow}/>
    </div>
  )
}

export default App