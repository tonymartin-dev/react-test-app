import React from 'react';
import http         from '../services/http.svc';

class LoginComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = { username: '', password: ''};
    
        this.handleChange = this.handleChange.bind(this);
        this.submit = this.submit.bind(this);
    }

    handleChange(event) {
        console.log({ [event.currentTarget.id]: event.target.value})
        this.setState({ [event.currentTarget.id]: event.target.value});
    }

    submit(){
        console.log('LOGIN: ',this.state);

        let config = {
            service: 'auth/login',
            method:  'POST',
            body:{
                username: this.state.username,
                password: this.state.password
            }
        }

        http.request('http://localhost:3100/', config).then(
            res => {
                console.log('[LOGIN SUCCESS]', res);
            }
        )
    }
    
    render() {
        console.log('Login');

        return (<div id="player">
            <h1>Login</h1>
            
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon3">User</span>
                    </div>
                    <input type="text" className="form-control" id="username" name="username" value={this.state.value} onChange={this.handleChange} aria-describedby="basic-addon3"/>
                </div>
                
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon3">Password</span>
                    </div>
                    <input type="password" className="form-control" id="password" name="password" value={this.state.value} onChange={this.handleChange} aria-describedby="basic-addon3"/>
                </div>
            
                <div>
                    <input type="submit" value="Log In" onClick={this.submit}/>
                </div>

        </div>)
    }
}

export default LoginComponent;