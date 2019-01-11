import React, {Component} from 'react';
import { Link } from 'react-router-dom';

//Local imports
import './user-menu.css';

export default class UserMenuComponent extends Component {

    constructor(props){
        super(props);
        console.log('Logout', props);
    }

    logout(){
        this.props.logIn(false);
    }

    render(){
        return (
            <div id="user-resume" className="dropdown">
                <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <img src="generic-user.png" className="user-logo" alt="UserLogo"></img>
                    <span>{this.props.user.name}&nbsp;</span>
                </button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <Link to="/profile" className="nav-link">Profile</Link>
                    <Link to="/logout" className="nav-link">Log Out</Link>
                    <div onClick={()=>this.logout()}>Logout2</div>
                </div>
            </div>
        )
    }
}