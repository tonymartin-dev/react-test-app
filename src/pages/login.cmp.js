import React from 'react';
import { Link } from 'react-router-dom';

//Services
import http         from '../services/http.svc';

//Local imports
import './login.css';

class LoginComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = { 
            errorMessage: null,
            status: props.status
        };
    
        this.handleChange = this.handleChange.bind(this);
        this.submit = this.submit.bind(this);        
    }

    credentials = { username: '', password: '' }

    handleChange(event) {
        this.credentials[event.currentTarget.id]= event.target.value;
    }

    submit(){

        //this.setState({username: this.credentials.username, password: this.credentials.password})
        var vm = this;
        console.log('LOGIN: ',vm.credentials);

        let config = {
            service: 'users/login',
            method:  'POST',
            body:{
                username: vm.credentials.username,
                password: vm.credentials.password
            }
        }

        http.request(config).then(
            res => {
                console.log('[LOGIN SUCCESS]', res);
                
                document.cookie = 'token='+res.token;

                //Set the new user in the App state;
                vm.props.loadUser(res.user);
               
                let { history } = vm.props;
                history.push('/blog');
                vm.props.logIn()
            },
            err => {
                console.log('[LOGIN ERROR]', err);
                vm.setState({errorMessage: 'Invalid Credentials'})
                vm.props.logIn(false)
            }
        )
    }

    
    render() {
        console.log('Login');

        var vm = this;
        
        var statusMsg;
        
        switch (vm.state.status) {
            case 'loggedOut':
                statusMsg = 'You have successfully logged out.';
                break;
            case 'expired':
                statusMsg = 'Your session expired. Please, log in again.';
                break;
            default:
                statusMsg = null;
                break;
        }

        return (<div id="login" className="container">
            <h1>Login</h1>
            
            {statusMsg ? (
                <div id="login-msg" className="alert alert-danger" role="alert">
                    {statusMsg}
                    <div className="close-btn" onClick={()=> vm.setState({status: null})}></div>
                </div>
            ):null}

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

            {vm.state.errorMessage ? (
                <div id="login-error">{vm.state.errorMessage}</div>
            ):(null)}
        
            <div className="btn-group">
                <input className="btn btn-primary" type="submit" value="Log In" onClick={this.submit}/>
                <Link to="/signup" className="btn btn-secondary">Sign Up</Link>
            </div>

        </div>)
    }
}

export default LoginComponent;