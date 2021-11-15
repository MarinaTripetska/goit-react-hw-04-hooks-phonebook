import './Filter.scss'
const shortid = require('shortid')

const inputFilterId = shortid.generate()
const Filter = ({ value, onChange }) => (
  <div className="filterThumb">
    <label htmlFor={inputFilterId} className="filter-label">
      Find contacts by name
    </label>
    <input id={inputFilterId} type="text" onChange={onChange} value={value} />
  </div>
)

export default Filter
