import PropTypes from 'prop-types'
import { MdPhoneEnabled } from 'react-icons/md'
import { AiFillDelete } from 'react-icons/ai'
import './ContactItem.scss'

const ContactItem = ({ id, name, number, onClick }) => {
  return (
    <li id={id} className="contactItem">
      <span className="contactItem__name">{name}:</span>
      <a href={'tel: ' + name} className="contactItem__number">
        <MdPhoneEnabled /> {number}
      </a>

      <button className="btn-delete" type="button" onClick={() => onClick(id)}>
        <AiFillDelete /> <span className="btn-delete--txt">Delete</span>
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
