import React, { Component } from "react";
import { Link } from "react-router-dom";

class Login extends Component {
    constructor (props){
        super(props)

        this.initialState = {
            email: '',
            password: ''
        };

        this.state = this.initialState;
        this.hidden = true;
    }

    handleChange = event => {
        const { name, value } = event.target;

        this.setState({
            [name] : value
        });
    }

    onFormSubmit = (event) =>{
        event.preventDefault();
        this.props.loginUser(this.state)
        this.setState(this.initialState)
        this.hidden = false;
    }


    render() {
        const {email, password} = this.state
        return (
            <div>
            <div class='login'>
                <h3>Welcom</h3>
                <h5>Login to get started!</h5>
                <form onSubmit={this.onFormSubmit}>
                <input 
                    placeholder="Email" 
                    type="text" 
                    name="email" 
                    id="email"
                    value={email} 
                    onChange={this.handleChange}/>
                <input
                    placeholder="Password"
                    type='password'
                    name='password'
                    id='password'
                    value={password}
                    onChange={this.handleChange}>
                </input>
                {!this.hidden ? (<div class='error'>
                    Your email and password incorrect. Try again.
                </div>)
                : <div></div>}
                <button type="submit">
                    Login
                </button>
                </form>
                </div>
                <div class='toForm'>
                    <p>
                        First time here? <Link to='/form'>Create your account.</Link>
                    </p>
                </div>
            </div>
        )
    }
}

export default Login