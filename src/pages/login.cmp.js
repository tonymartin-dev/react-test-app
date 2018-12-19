import React from 'react';
import http         from '../services/http.svc';

class LoginComponent extends React.Component {

    constructor(props) {
        super(props);
        //this.state = { username: '', password: '' };
    
        this.handleChange = this.handleChange.bind(this);
        this.submit = this.submit.bind(this);
    }

    credentials = { username: '', password: '' }

    handleChange(event) {
        //this.setState({ [event.currentTarget.id]: event.target.value});
        this.credentials[event.currentTarget.id]= event.target.value;
    }

    submit(){

        //this.setState({username: this.credentials.username, password: this.credentials.password})

        console.log('LOGIN: ',this.credentials);

        let config = {
            service: 'auth/login',
            method:  'POST',
            body:{
                username: this.credentials.username,
                password: this.credentials.password
            }
        }

        http.request('http://localhost:3100/', config).then(
            res => {
                console.log('[LOGIN SUCCESS]', res);
                var token = res.token;
                document.cookie = 'token='+token;
                document.cookie = 'probando=sdofinsdvoisdvoisdjvoisdjvosidjv'
                let { history } = this.props;
                history.push('/blog');
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
                    <input type="text" className="form-control" id="username" name="username" value={this.credentials.value} onChange={this.handleChange} aria-describedby="basic-addon3"/>
                </div>
                
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon3">Password</span>
                    </div>
                    <input type="password" className="form-control" id="password" name="password" value={this.credentials.value} onChange={this.handleChange} aria-describedby="basic-addon3"/>
                </div>
            
                <div>
                    <input className="btn" type="submit" value="Log In" onClick={this.submit}/>
                </div>

        </div>)
    }
}

export default LoginComponent;