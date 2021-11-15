import { Component } from 'react';
// import SignUpForm from './components/SignUpForm';
const shortid = require('shortid');


class App extends Component {

state = {
  name: '',
  number: '',
   filter: '',
  contacts: [
     {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
    {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
    {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
    {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
  ],
}
  
  inputNameId = shortid.generate();
  inputPhoneId = shortid.generate();
  
handleChange = (e) => {
  const { name, value } = e.target;
  this.setState({
    [name]: value
  })
}
  handleSubmit = (e) => {
    e.preventDefault()
    const { name, number } = this.state;
    // console.log(name);
console.log({ userName: name, phone: number });
    this.setState((prevState) => {
      return {
        contacts: [...prevState.contacts, {id:shortid.generate(), name, number }]
      }
    })


    this.reset()
  }
  reset = ()=> {
    this.setState({name: '', number:''})
  }
//   formSubmitHandler = (data) => {
//    console.log(data);
//  }
  render() {
   const {name, number, contacts, filter} = this.state
    return (
      <>
        <h1>Phonebook</h1>
        
        <form onSubmit={this.handleSubmit}>
          <label htmlFor={this.inputNameId}>Name</label>
          <input
            id={this.inputId}
              type="text"
              name="name"
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
            onChange={this.handleChange}
            value={name}
              required
          />
          <br/>
          <label htmlFor={this.inputPhoneId}>Phone</label>
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
          <br/>
          <button type='submit' >Add contact</button>
        </form>
          { contacts.length>0 && <div>
          <h2>Сontacts</h2>
          <input
            id={this.inputId}
              type="text"
              name="filter"
              
            onChange={this.handleChange}
            value={filter}
              
          />
                                    <ul>
            {contacts.map(contact => <li>{contact.name}: {contact.number}</li>)}
                                    </ul>
                                 </div>}
       

        {/* { userName: name, phone: number } */}
        </>
      // <SignUpForm onSubmit={ this.formSubmitHandler }/>
    )
  }
  
}

export default App;
