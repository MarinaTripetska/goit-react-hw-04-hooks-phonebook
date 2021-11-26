import { useState } from 'react'
import useLocalStorage from './hooks/useLocalStorage'

import { ToastContainer } from 'react-toastify'
import notify from './nofifications/notifyError'

import Filter from './components/Filter'
import ContactList from './components/ContactList'
import ContactForm from './components/ContactForm'

import './App.scss'

import { initialContacts } from './initialContacts'
const shortid = require('shortid')

export default function App() {
  const [filter, setFilter] = useState('')
  const [contacts, setContacts] = useLocalStorage('contacts', [...initialContacts])

  const handleSubmit = (dataName, dataNumber) => {
    const findSameName = contacts.find(({ name }) => name === dataName)
    !findSameName
      ? setContacts(prevState => {
          return [...prevState, { id: shortid.generate(), name: dataName, number: dataNumber }]
        })
      : notify(`${dataName} is already in contacts!`)
  }

  const changeFilter = e => {
    setFilter(e.currentTarget.value)
  }

  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase()
    return contacts.filter(contact => contact.name.toLowerCase().includes(normalizedFilter))
  }
  const visibleContacts = getVisibleContacts()

  const handleDelete = dataId => {
    setContacts(prevState => prevState.filter(({ id }) => id !== dataId))
  }

  return (
    <div className="mainThumb">
      <ToastContainer />
      <h1 className="title">Phone book</h1>
      <ContactForm handleSubmit={handleSubmit} />

      {contacts.length > 0 && (
        <div className="contactThumb">
          <h2 className="title">Сontacts</h2>
          <Filter value={filter} onChange={changeFilter} />
          <ContactList contacts={visibleContacts} onClick={handleDelete} />
        </div>
      )}
    </div>
  )
}
