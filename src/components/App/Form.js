import React, {Component} from 'react';

class Form extends Component {
    constructor(props) {
        super(props);
        
        this.hidden = false;

        this.initialState = {
            id: 1,
            firstName: '',
            lastName: '',
            email: ''
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
        }
        else{
            this.setState(this.state);
            this.hidden = true;
        }
    }

    render() {
        const { firstName, lastName, email } = this.state; 
        return (
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
                {this.hidden ? (<div class='error'>
                    You hadn't wrote your first name, last name or email!
                    Please, write and try again.
                </div>)
                : <div></div>}
                <button type="add user">
                    Add User
                </button>
                
            </form>
        );
    }
}

export default Form;