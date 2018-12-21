import React, {Component} from 'react';
import { Link } from 'react-router-dom';

//Local imports
import './user-menu.css';

export default class UserMenuComponent extends Component {
    render(){
        return (
            <div id="user-resume" class="dropdown">
                <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <img src="generic-user.png" className="user-logo" alt="UserLogo"></img>
                    <span>{this.props.user.name}&nbsp;</span>
                </button>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <Link to="/profile" className="nav-link">Profile</Link>
                    <Link to="/logout" className="nav-link">Log Out</Link>
                </div>
            </div>
        )
    }
}