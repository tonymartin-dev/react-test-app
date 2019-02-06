import React        from 'react';
import http         from '../services/http.svc';
import ModalService from '../components/modal/modal.svc';
import isValid          from '../services/validate.svc';

class SignupComponent extends React.Component {

    constructor(props) {
        super(props);
        //this.state = { username: '', password: '' };
    
        this.handleChange = this.handleChange.bind(this);
        this.submit = this.submit.bind(this);
        this.goBack = this.goBack.bind(this);

        //Create a new modal instance.
        this.modal = ModalService();
        console.log('Modal instance', this.modal);
    }

    credentials = {}

    handleChange(event) {
        //this.setState({ [event.currentTarget.id]: event.target.value});
        this.credentials[event.currentTarget.id]= event.target.value;
    }

    isInvalidData(data){

        let invalidData = [];

        if(!data.email || !isValid.email(data.email)) invalidData.push('email');
        if(!data.phone || !isValid.phone(data.phone)) invalidData.push('phone');

        return invalidData.length > 0 ? invalidData : false;
    }

    submit(){

        console.log('SIGNIN: ',this.credentials);

        var vm = this;

        let isInvalid = this.isInvalidData(this.credentials);
        let isRequired = (this.credentials.password && this.credentials.password && this.credentials.name && this.credentials.email) ? true : false;
        if(!isRequired){
            vm.openRequiredModal(vm.modal.openSimpleModal);
        }else if (isInvalid){
            vm.openInvalidDataModal(isInvalid, vm.modal.openSimpleModal);
        } else {
            
            let config = {
                service: 'users/signup',
                method:  'POST',
                body:{
                    username:   this.credentials.username,
                    password:   this.credentials.password,
                    name:       this.credentials.name,
                    email:      this.credentials.email,
                    website:    this.credentials.website,
                    phone:      this.credentials.phone
                }
            }
    
            console.log('SignIn: ', config);
            
            http.request(config).then(
                res => {
                    console.log('[SIGN IN SUCCESS]', res);
                    var config ={
                        title:       'Sign up success',
                        body:        'You has created your account! Now go to login and enjoy our blog :)',
                    }
                    var modal = ModalService();
                    modal.openSimpleModal(config).then(
                        res => {
                            console.log('Modal closed', res);
                            let { history } = this.props;
                            history.push('/');
                        }
                    );
                },
                err => {
                    console.log('[SIGN IN ERROR]', err);
                    var config ={
                        title:       'Sign up error',
                        isError:     true,
                        body:        'There was an error creating yout account :( . Try it again later!',
                    }
                    var modal = ModalService();
                    modal.openSimpleModal(config).then(
                        res => {
                            console.log('Modal closed', res);
                        }
                    );
                }
            );

        }

        
    }

    openInvalidDataModal(isInvalid, openModal) {
        let invalidString = isInvalid.join(', ');
        var config = {
            title: 'Invalid Format',
            body: 'Check this fields: ' + invalidString,
            isError: true
        };
        openModal(config);
    }

    openRequiredModal(openModal) {
        var config = {
            title: 'Uncomplete data',
            body: 'Fill all required fields',
            isError: true
        };
        openModal(config);
        return config;
    }

    goBack(){
        this.props.setStatus(false);
        let{history} = this.props;
        history.push('/');
    }

    
    render() {
        console.log('Login');

        return (<div id="login" className="container">
            <h1>Sign Up</h1>

            <h5>Account data</h5>            
            <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon3">Username</span>
                </div>
                <input type="text" className="form-control" id="username" name="username" value={this.credentials.value} onChange={this.handleChange} aria-describedby="basic-addon3"/>
            </div>            
            <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon3">Password</span>
                </div>
                <input type="password" className="form-control" id="password" name="password" value={this.credentials.value} onChange={this.handleChange} aria-describedby="basic-addon3"/>
            </div>

            <h5>Account data</h5>            
            <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon3">Name</span>
                </div>
                <input type="text" className="form-control" id="name" name="name" value={this.credentials.value} onChange={this.handleChange} aria-describedby="basic-addon3"/>
            </div>
            <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon3">Email</span>
                </div>
                <input type="email" className="form-control" id="email" name="email" value={this.credentials.value} onChange={this.handleChange} aria-describedby="basic-addon3"/>
            </div>
            <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon3">Website</span>
                </div>
                <input type="text" className="form-control" id="website" name="website" value={this.credentials.value} onChange={this.handleChange} aria-describedby="basic-addon3"/>
            </div>
            <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon3">Phone number</span>
                </div>
                <input type="text" className="form-control" id="phone" name="phone" value={this.credentials.value} onChange={this.handleChange} aria-describedby="basic-addon3"/>
            </div>

            <div className="btn-group">
                <input className="btn btn-primary" type="submit" value="Sign Up!" onClick={this.submit}/>
                <div className="nav-link" onClick={()=>this.goBack()} className="btn btn-secondary">Bring me back to Log In!</div>
            </div>

        </div>)
    }
}

export default SignupComponent;