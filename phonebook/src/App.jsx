import { useState, useEffect } from 'react'

import Filter from './components/Filter'
import Notification from './components/Notification'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    personService.getAll().then((initial) => setPersons(initial))
  }, [])

  const notify = (message, type = 'success') => {
    setNotification({ message, type })
    setTimeout(() => setNotification(null), 5000)
  }

  const addPerson = (event) => {
    event.preventDefault()
    const name = newName.trim()
    const number = newNumber.trim()
    if (!name || !number) {
      return
    }

    const existing = persons.find((p) => p.name === name)

    if (existing) {
      const ok = window.confirm(
        `${name} is already added to the phonebook, replace the old number with a new one?`
      )
      if (!ok) {
        return
      }

      personService
        .update(existing.id, { ...existing, number })
        .then((returned) => {
          setPersons(persons.map((p) => (p.id !== existing.id ? p : returned)))
          notify(`Updated ${name}`)
          setNewName('')
          setNewNumber('')
        })
        .catch(() => {
          notify(
            `Information of ${name} has already been removed from server`,
            'error'
          )
          setPersons(persons.filter((p) => p.id !== existing.id))
        })
      return
    }

    personService
      .create({ name, number })
      .then((returned) => {
        setPersons(persons.concat(returned))
        notify(`Added ${name}`)
        setNewName('')
        setNewNumber('')
      })
      .catch(() => {
        notify('Could not save person on the server', 'error')
      })
  }

  const deletePerson = (person) => {
    if (!window.confirm(`Delete ${person.name}?`)) {
      return
    }

    personService
      .remove(person.id)
      .then(() => {
        setPersons(persons.filter((p) => p.id !== person.id))
      })
      .catch(() => {
        notify(
          `Information of ${person.name} has already been removed from server`,
          'error'
        )
        setPersons(persons.filter((p) => p.id !== person.id))
      })
  }

  const personsToShow =
    filter.trim() === ''
      ? persons
      : persons.filter((p) =>
          p.name.toLowerCase().includes(filter.toLowerCase())
        )

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification notification={notification} />

      <Filter value={filter} onChange={setFilter} />

      <h3>Add a new</h3>

      <PersonForm
        onSubmit={addPerson}
        newName={newName}
        newNumber={newNumber}
        onNameChange={(e) => setNewName(e.target.value)}
        onNumberChange={(e) => setNewNumber(e.target.value)}
      />

      <h3>Numbers</h3>

      <Persons persons={personsToShow} onDelete={deletePerson} />
    </div>
  )
}

export default App
