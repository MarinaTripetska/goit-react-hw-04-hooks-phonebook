import { useState } from 'react'
import useLocalStorage from './hooks/useLocalStorage'
import { ToastContainer } from 'react-toastify'
import notify from './nofifications/notifyError'
import Filter from './components/Filter'
import ContactList from './components/ContactList'
import ContactForm from './components/ContactForm'
import { Container, Section, H1, H2 } from './components/BasicStyledComponents'

import { initialContacts } from './initialContacts'

const shortid = require('shortid')

export default function App() {
  const [filter, setFilter] = useState('')
  const [contacts, setContacts] = useLocalStorage('contacts', [...initialContacts])

  const changeFilter = e => setFilter(e.target.value)

  const handleSubmit = (dataName, dataNumber) => {
    const findSameName = contacts.find(({ name }) => name.toLowerCase() === dataName.toLowerCase())

    !findSameName
      ? setContacts(prevState => [...prevState, { id: shortid.generate(), name: dataName, number: dataNumber }])
      : notify(`${dataName} is already in contacts!`)
  }

  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase()
    return contacts.filter(contact => contact.name.toLowerCase().includes(normalizedFilter))
  }

  const handleDelete = dataId => {
    setContacts(prevState => prevState.filter(({ id }) => id !== dataId))
  }

  return (
    <Container>
      <ToastContainer />
      <H1>Phone book</H1>
      <ContactForm handleSubmit={handleSubmit} />

      {contacts.length > 0 && (
        <Section>
          <H2>Сontacts</H2>
          <Filter value={filter} onChange={changeFilter} />
          <ContactList contacts={getVisibleContacts()} onClick={handleDelete} />
        </Section>
      )}
    </Container>
  )
}
