import { useState } from 'react'
import PropTypes from 'prop-types'
import { MdAddIcCall } from 'react-icons/md'
import './ContactForm.scss'
const shortid = require('shortid')

export default function ContactForm({ handleSubmit }) {
  const [name, setName] = useState('')
  const [number, setNumber] = useState('')

  const inputNameId = shortid.generate()
  const inputPhoneId = shortid.generate()

  const handleChange = e => {
    const { name, value } = e.target

    switch (name) {
      case 'name':
        setName(value)
        break

      case 'number':
        setNumber(value)
        break

      default:
        return
    }
  }

  const onFormSubmit = e => {
    e.preventDefault()
    handleSubmit(name, number)
    reset()
  }

  const reset = () => {
    setName('')
    setNumber('')
  }

  return (
    <form className="contactForm" onSubmit={onFormSubmit}>
      <label className="rowName" htmlFor={inputNameId}>
        Name
        <input
          className="input"
          id={inputNameId}
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
          onChange={handleChange}
          value={name}
          required
        />
      </label>

      <label className="rowNumber" htmlFor={inputPhoneId}>
        Phone
        <input
          className="input"
          id={inputPhoneId}
          type="tel"
          name="number"
          onChange={handleChange}
          value={number}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
          required
        />
      </label>

      <br />

      <button className="buttonSubmit" type="submit">
        <MdAddIcCall className="buttonSubmit-icon" /> <span className="buttonSubmit-txt">Add contact</span>
      </button>
    </form>
  )
}
ContactForm.defaultProps = {
  handleSubmit: () => null,
}
ContactForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
}
