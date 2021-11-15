import PropTypes from 'prop-types'
import './ContactItem.scss'
const ContactItem = ({ id, name, number, onClick }) => {
  return (
    <li id={id} className="contactItem">
      <span className="contactItem__name">{name}:</span>
      <span className="contactItem__number">{number}</span>

      <button className="btn-delete" type="button" onClick={() => onClick(id)}>
        Delete
      </button>
    </li>
  )
}
ContactItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
}
export default ContactItem
