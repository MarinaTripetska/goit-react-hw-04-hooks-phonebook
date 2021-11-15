import { Component } from "react"
const shortid = require('shortid')

const INITIAL_STATE = {
    login: '',
    email: '',
    password: '',
    agreed: false,
    experience: 'junior'
}


export default class SignUpForm extends Component{
    state= {
       ...INITIAL_STATE
    }

    radioID1 = shortid.generate();
    radioID2 = shortid.generate();
    radioID3 = shortid.generate();

    handleChange = ({ target }) => {
        const { name, value, type, checked } = target;

         this.setState({ [name]: type === 'checkbox' ? checked : value });
    }



    handleSubmit = e => {
        e.preventDefault();
        const { login, email, password, agreed} = this.state;

        console.log(`
      Login: ${login}
      Email: ${email}
      Password: ${password}
      Agreed: ${agreed}
    `);
        
        this.props.onSubmit({...this.state});
        this.reset();
    }


    reset = () => {
        this.setState({...INITIAL_STATE})
    }


    render() {
         const { login, email, password, agreed, experience } = this.state;
        return (
            <form onSubmit={this.handleSubmit}>
                 <label>
                    Name
                    <input
                        type="text"
                        placeholder="Enter login"
                        name="login"
                        value={login}
                        onChange={this.handleChange}
                    />
                </label>
              
                 <label>
                    Password
                    <input
                        type="password"
                        placeholder="Enter password"
                        name="password"
                        value={password}
                        onChange={this.handleChange}
                    />
                </label>

                <label>
                    Email
                    <input
                        type="email"
                        placeholder="Enter email"
                        name="email"
                        value={email}
                        onChange={this.handleChange}
                    />
                </label>

                <label htmlFor={this.radioID1}>
                    <input type='radio'
                        name='experience'
                        value='junior'
                        id={this.radioID1}
                        checked={experience === 'junior'}
                    onChange={this.handleChange}></input>Junior
                </label>
                <label htmlFor={this.radioID2}>
                    <input type='radio'
                        name='experience'
                        value='middle'
                        id={this.radioID2}
                        checked={experience === 'middle'}
                    onChange={this.handleChange}></input>Middle
                </label>
                <label htmlFor={this.radioID3}>
                    <input type='radio'
                        name='experience'
                        value='senior'
                        id={this.radioID3}
                        checked={experience === 'senior'}
                    onChange={this.handleChange}></input>Senior
                </label>


                 <label>
                    Agree to terms
                    <input
                        name="agreed"
                        type="checkbox"
                        checked={agreed}
                        onChange={this.handleChange}
                    />
                </label>
                <button type="submit" disabled={!agreed}>Sign up as {login}</button>

            </form>
        )
    }
}