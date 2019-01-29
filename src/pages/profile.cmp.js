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
    }

    editProfile(bool){
        this.setState(prevState => {        //To use the previous state, we don't pass an object as argument of setState(). Instead, we use a function whose argument is the previous state
            return {
                editProfile: !prevState.editProfile
            };
        });
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
                                <input defaultValue={vm.props.user.name}></input>
                                <input defaultValue={vm.props.user.email}></input>
                                <input defaultValue={vm.props.user.phone}></input>
                                <input defaultValue={vm.props.user.username}></input>
                                <input defaultValue={vm.props.user.website}></input>
                            </div>

                            <button className="btn" onClick={()=>vm.editProfile()}>Save</button>
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
                                <div className="profile-element right">{vm.props.user.name}</div>
                                <div className="profile-element right">{vm.props.user.email}</div>
                                <div className="profile-element right">{vm.props.user.phone}</div>
                                <div className="profile-element right">{vm.props.user.username}</div>
                                <div className="profile-element right">{vm.props.user.website}</div>
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