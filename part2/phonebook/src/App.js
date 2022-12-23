import { useState, useEffect } from 'react'
import { Person, PersonForm, Filter } from './components/phoneComp'
import phoneServices from './services/phoneServices'


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '480-201-392', id: 1 }
  ])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [showPerson, setShowPerson] = useState('')
  const [showPersonBool, setShowPersonBool] = useState(false)

  const hook = () => {
    phoneServices
      .getAll()
      .then(returnedData => {
        setPersons(returnedData)
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

    //update backend
    phoneServices
      .create(newPerson)
      .then(returnedData => {
        //update UI
        setPersons([...persons, returnedData])
        setNewName('')
        setNewPhone('')
      })
  }

  const checkDuplicate = (newPerson) => {
    for (let person of persons) {
      if (person.name === newPerson.name) {
        if (window.confirm(`${person.name} is already added in the phonebook, replace old number with the new number?`)) {
          phoneServices
            .update(newPerson, person.id)
            .then(returnedNewPerson => {
              setPersons(persons.map(person => 
                person.id !== returnedNewPerson.id ? person : returnedNewPerson))
              setNewName('')
              setNewPhone('')
            })
        }
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

  const deletePerson = (id) => {
    const personRequested = persons.filter(person => person.id === id) //returns an array with 1 object
    if (window.confirm(`delete ${personRequested[0].name}?`)) {
      //detele person from backend
      phoneServices
        .deleteId(id)
        .then(deletePerson => {
          //remove person from ui
          setPersons(persons.filter(person =>
            person.id !== id //filters out the person that we just removed
          ))
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={showPerson} onChange={setShow} />
      <h3>Add a new person</h3>
      <PersonForm onSubmit={addPerson} values={[newName, newPhone]} onChange={[changeName, changePhone]} />
      <h2>Numbers</h2>
      <Person persons={personToShow} deleteOperation={deletePerson} />
    </div>
  )
}

export default App