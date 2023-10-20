import {BrowserRouter, Navigate} from 'react-router-dom';
import { Routes, Route } from 'react-router-dom'
import Table from './Table';
import Form from './Form';
import Login from './Login';
import { Component } from 'react';


class App extends Component {
    state = JSON.parse(window.localStorage.getItem('state')) || {
        characters: [],
        characterLastId: 1,
        isLogined: false
    };

    setState(state) {
        window.localStorage.setItem('state', JSON.stringify(state));
        
        super.setState(state);
    }

    removeCharacter = index => {
        const { characters } = this.state;
        this.setState({
            characters: characters.filter((character, i) => { 
                return i !== index;
            }),
            characterLastId: this.state.characterLastId,
            isLogined: this.state.isLogined
        });

    }

    handleSubmit = character => {
        this.setState({
            characters: [...this.state.characters, character], 
            characterLastId: this.state.characterLastId + 1, 
            isLogined: this.state.isLogined});
    }

    loginUser = ({email, password}) =>{
        console.log(this.state)
        let user = this.state.characters.filter((character) =>{
            return email === character.email
        })
        user = user.filter((character) => {
            return password === character.password
        })
        if(user.length !== 0){
            this.setState({...this.state, isLogined: true});
        }
    }

    render() {
        const { characters, characterLastId, isLogined } = this.state;
        return(
            <BrowserRouter>
                    {
                       isLogined ?  
                       <Routes>
                        <Route path='/users' element={<Table characterData={characters} removeCharacter={this.removeCharacter} logOut={() => this.setState({...this.state, isLogined: false})}/>}/>
                        <Route path='*' element={<Navigate to='/users'/>}/>
                       </Routes>
                       :
                       <Routes>
                            <Route path='/login' element={<Login loginUser={this.loginUser}/>}/>
                            <Route path='/form' element={<Form characterLastId={characterLastId} handleSubmit={this.handleSubmit}/>}/>
                            <Route path='*' element={<Navigate to='/login'/>}/>
                       </Routes>
                    }
            </BrowserRouter>
        );
    }
}

export default App;
