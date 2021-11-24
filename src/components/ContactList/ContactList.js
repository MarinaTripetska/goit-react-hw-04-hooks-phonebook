import ContactItem from './ContactIItem/ContactItem'
import PropTypes from 'prop-types'

import './ContactList.scss'

const ContactList = ({ contacts, onClick }) => {
  return (
    <ul className="contactList">
      {contacts.map(contact => (
        <ContactItem key={contact.id} id={contact.id} name={contact.name} number={contact.number} onClick={onClick} />
      ))}
    </ul>
  )
}

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    }),
  ),
}

export default ContactList
