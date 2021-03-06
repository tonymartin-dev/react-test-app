import React            from 'react';

//Services
import http             from '../services/http.svc';
import validateSvc          from '../services/validate.svc';
import ModalService     from '../components/modal/modal.svc'
import LoaderService    from '../components/loader/loader.svc'

//Local imports
import './profile.css';

class ProfileComponent extends React.Component {

    constructor(props) {
        super(props);
        console.log(props.user)
        props.logIn();

        this.state = {
            editProfile: false,
            savedUserData: {...this.props.user},
            userData: {...this.props.user}
        };

        //Create a new modal instance.
        this.modal = ModalService();
        console.log('Modal instance', this.modal);
       
        this.handleChange = this.handleChange.bind(this);
        this.submit = this.submit.bind(this);        
    }

    editProfile(){
        this.setState(prevState => {        //To use the previous state, we don't pass an object as argument of setState(). Instead, we use a function whose argument is the previous state
            return {
                editProfile: !prevState.editProfile
            };
        });
    }

    handleChange(event) {
        //this.userData[event.currentTarget.id]= event.target.value;
        let userData = this.state.userData;
        userData[event.currentTarget.id]= event.target.value;
        this.setState({userData: userData});
    }

    isInvalidData(data){

        let invalidData = [];

        if(!validateSvc.email(data.email)) invalidData.push('email');
        if(!validateSvc.phone(data.phone)) invalidData.push('phone');

        return invalidData.length > 0 ? invalidData : false;
    }

    cancel(){
        this.setState({userData: {...this.state.savedUserData}});
        this.editProfile();
    }

    submit(){
        var vm = this;
        
        let isInvalid = validateSvc.isInvalid(vm.state.userData);

        if(isInvalid){

            let invalidString = isInvalid.join(', ')
            
            var config ={
                title:       'Invalid Format',
                body:        'Check this fields: ' + invalidString,
                isError:     true
            }
            vm.modal.openSimpleModal(config);

        } else {

            var config= {
                method: 'PUT',
                service: 'users',
                body: vm.state.userData
            }

            http.request(config).then(
                ()=>{
                    vm.setState({savedUserData: vm.state.userData});
                    vm.editProfile();
                },
                ()=>{
                    console.log('KO');
                }
            )

        };
    }
     
    render(){

        var vm = this;

        function getUserData(){
            console.log('USER LOADED')
            let config = {
                service: 'users',
                params: {
                    id: vm.props.user._id
                }
            }
            http.request(config).then(
                res => {
                    
                },
                err => {
                    
                }
            );
        }

        vm.getUserData = getUserData;

        return <div id="player">
            <h1>Profile</h1>
            {vm.props.user ? (
                <div id="profile-container">
                    {vm.state.editProfile ? (
                        <div>
                            <div id="profile-container">
                                <div className="profile-element left">Name:</div>
                                <div className="profile-element left">E-mail:</div>
                                <div className="profile-element left">Phone number:</div>
                                <div className="profile-element left">User name:</div>
                                <div className="profile-element left">Website:</div>
                                <input defaultValue={vm.state.userData.name} id="name" onChange={this.handleChange}></input>
                                <input defaultValue={vm.state.userData.email} id="email" onChange={this.handleChange}></input>
                                <input defaultValue={vm.state.userData.phone} id="phone" onChange={this.handleChange}></input>
                                <input defaultValue={vm.state.userData.username} id="username" onChange={this.handleChange}></input>
                                <input defaultValue={vm.state.userData.website} id="website" onChange={this.handleChange}></input>
                            </div>

                            <div className="btn-group">
                                <button className="btn btn-success" onClick={()=>vm.submit()}>Save</button>
                                <button className="btn btn-secondary" onClick={()=>vm.cancel()}>Cancel</button>
                            </div>

                        </div>

                    ):(
                        <div>
                            <div id="profile-container">
                                <div className="profile-element left">Name:</div>
                                <div className="profile-element left">E-mail:</div>
                                <div className="profile-element left">Phone number:</div>
                                <div className="profile-element left">User name:</div>
                                <div className="profile-element left">Website:</div>
                                <div className="profile-element right">{vm.state.userData.name}</div>
                                <div className="profile-element right">{vm.state.userData.email}</div>
                                <div className="profile-element right">{vm.state.userData.phone}</div>
                                <div className="profile-element right">{vm.state.userData.username}</div>
                                <div className="profile-element right">{vm.state.userData.website}</div>
                            </div>
                            
                            <button className="btn btn-primary" onClick={()=>vm.editProfile()}>EDIT</button>

                        </div>
                        
                    )}
                </div>
            ):(
                <p>Loading</p>
            )}
        </div>
    }

}

export default ProfileComponent;