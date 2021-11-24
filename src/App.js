import { Component } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import Filter from './components/Filter'
import ContactList from './components/ContactList'
import ContactForm from './components/ContactForm'
import './App.scss'

const shortid = require('shortid')

const initialContacts = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
]

const notify = text =>
  toast.error(text, {
    position: 'top-center',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  })

class App extends Component {
  state = {
    filter: '',
    contacts: [...initialContacts],
  }

  componentDidMount() {
    const savedContacts = JSON.parse(localStorage.getItem('contacts'))

    if (savedContacts && savedContacts.length > 0) {
      this.setState({
        contacts: [...savedContacts],
      })
    }
  }

  componentDidUpdate() {
    localStorage.setItem('contacts', JSON.stringify(this.state.contacts))
  }

  changeFilter = e => {
    this.setState({
      filter: e.currentTarget.value,
    })
  }

  handleSubmit = (dataName, dataNumber) => {
    const findSameName = this.state.contacts.find(({ name }) => name === dataName)

    !findSameName
      ? this.setState(prevState => {
          return {
            contacts: [...prevState.contacts, { id: shortid.generate(), name: dataName, number: dataNumber }],
          }
        })
      : notify(`${dataName} is already in contacts!`)
  }

  handleDelete = dataId => {
    this.setState(prevState => {
      return {
        contacts: prevState.contacts.filter(({ id }) => id !== dataId),
      }
    })
  }

  getVisibleContacts = () => {
    const { contacts, filter } = this.state
    const normalizedFilter = filter.toLowerCase()

    return contacts.filter(contact => contact.name.toLowerCase().includes(normalizedFilter))
  }

  render() {
    const { contacts, filter } = this.state
    const visibleContacts = this.getVisibleContacts()
    return (
      <div className="mainThumb">
        <ToastContainer />
        <h1 className="title">Phonebook</h1>
        <ContactForm handleSubmit={this.handleSubmit} />
        {contacts.length > 0 && (
          <div className="contactThumb">
            <h2 className="title">Сontacts</h2>
            <Filter value={filter} onChange={this.changeFilter} />
            <ContactList contacts={visibleContacts} onClick={this.handleDelete} />
          </div>
        )}
      </div>
    )
  }
}

export default App
