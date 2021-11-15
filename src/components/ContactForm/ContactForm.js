import { Component } from 'react'
import PropTypes from 'prop-types'
import './ContactForm.scss'
const shortid = require('shortid')

export default class ContactForm extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
  }

  state = {
    name: '',
    number: '',
  }

  inputNameId = shortid.generate()
  inputPhoneId = shortid.generate()

  handleChange = e => {
    const { name, value } = e.target
    this.setState({
      [name]: value,
    })
  }

  onFormSubmit = e => {
    const { name, number } = this.state
    e.preventDefault()
    this.props.handleSubmit(name, number)
    this.reset()
  }

  reset = () => {
    this.setState({ name: '', number: '' })
  }

  render() {
    const { name, number } = this.state

    return (
      <form className="contactForm" onSubmit={this.onFormSubmit}>
        <label className="inputName" htmlFor={this.inputNameId}>
          Name
          <input
            id={this.inputNameId}
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
            onChange={this.handleChange}
            value={name}
            required
          />
        </label>
        <label className="inputNumber" htmlFor={this.inputPhoneId}>
          Phone
          <input
            id={this.inputPhoneId}
            type="tel"
            name="number"
            onChange={this.handleChange}
            value={number}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
            required
          />
        </label>
        <br />
        <button className="buttonSubmit" type="submit">
          Add contact
        </button>
      </form>
    )
  }
}
