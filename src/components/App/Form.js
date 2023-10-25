import React, {Component} from 'react';
import { Navigate } from 'react-router-dom';

class Form extends Component {
    constructor(props) {
        super(props);
        
        this.hidden = false;
        this.isNewUser = false;
        this.initialState = {
            id: props.characterLastId,
            firstName: '',
            lastName: '',
            email: '',
            password: ''
        };

        this.state = this.initialState;
    }

    handleChange = event => {
        const { name, value } = event.target;

        this.setState({
            [name] : value
        });
    }

    onFormSubmit = (event) => {
        event.preventDefault();
        if(!Object.values(this.state).includes('')){
            this.props.handleSubmit(this.state);
            this.initialState.id++;
            this.setState(this.initialState);
            this.hidden = false;
            this.isNewUser = true;
        }
        else{
            this.setState(this.state);
            this.hidden = true;
        }
    }

    render() {
        const { firstName, lastName, email, password } = this.state; 
        return (
            <div class='form'>
                {this.isNewUser && (<Navigate to="/login" replace={true} />)}
                <h3>Add user</h3>
            <form onSubmit={this.onFormSubmit}>
                <label for="firstName">First Name</label>
                <input 
                    type="text" 
                    name="firstName" 
                    id="firstName"
                    value={firstName} 
                    onChange={this.handleChange} />
                <label for="lastName">Last Name</label>
                <input 
                    type="text" 
                    name="lastName" 
                    id="lastName"
                    value={lastName} 
                    onChange={this.handleChange} />
                <label for="email">Email</label>
                <input 
                    type="text" 
                    name="email" 
                    id="email"
                    value={email} 
                    onChange={this.handleChange} />
                <label for="password">Password</label>
                <input
                    type='password'
                    name='password'
                    id='password'
                    value={password}
                    onChange={this.handleChange}>
                </input>
                {this.hidden ? (<div class='error'>
                    You hadn't wrote your first name, last name or email!
                    Please, write and try again.
                </div>)
                : (<div></div>)}
                    <button type="add user">
                        Add User
                    </button>  
            </form>
            </div>
        );
    }
}

export default Form;