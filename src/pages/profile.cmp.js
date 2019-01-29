import React from 'react';
import http   from '../services/http.svc';

import './profile.css';

class ProfileComponent extends React.Component {

    constructor(props) {
        super(props);
        console.log(props.user)
        props.logIn();

        this.state = {
            editProfile: false
        }
        
        this.userData = {...this.props.user}
        
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
        this.userData[event.currentTarget.id]= event.target.value;
    }

    submit(){
        var vm = this;
        var config= {
            method: 'PUT',
            service: 'users',
            body: this.userData
        }
        http.request(config).then(
            ()=>{
                vm.editProfile();
            },
            ()=>{
                console.log('KO');
            }
        )
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
                                <input defaultValue={vm.userData.name} id="name" onChange={this.handleChange}></input>
                                <input defaultValue={vm.userData.email} id="email" onChange={this.handleChange}></input>
                                <input defaultValue={vm.userData.phone} id="phone" onChange={this.handleChange}></input>
                                <input defaultValue={vm.userData.username} id="username" onChange={this.handleChange}></input>
                                <input defaultValue={vm.userData.website} id="website" onChange={this.handleChange}></input>
                            </div>

                            <button className="btn" onClick={()=>vm.submit()}>Save</button>
                            <button className="btn" onClick={()=>vm.editProfile()}>Cancel</button>

                        </div>

                    ):(
                        <div>
                            <div id="profile-container">
                                <div className="profile-element left">Name:</div>
                                <div className="profile-element left">E-mail:</div>
                                <div className="profile-element left">Phone number:</div>
                                <div className="profile-element left">User name:</div>
                                <div className="profile-element left">Website:</div>
                                <div className="profile-element right">{vm.userData.name}</div>
                                <div className="profile-element right">{vm.userData.email}</div>
                                <div className="profile-element right">{vm.userData.phone}</div>
                                <div className="profile-element right">{vm.userData.username}</div>
                                <div className="profile-element right">{vm.userData.website}</div>
                            </div>
                            
                            <button className="btn" onClick={()=>vm.editProfile()}>EDIT</button>

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