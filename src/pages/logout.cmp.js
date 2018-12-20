import React from 'react';
import { Link } from 'react-router-dom';

class LogoutComponent extends React.Component {
    
    render() {
        console.log('Logout');

        document.cookie = 'token=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';

        return (<div id="player">
            <h1>Log out</h1>
            
            <h4>You have successfuly logged out.</h4>

            <Link to="/" className="btn">Log in</Link>

        </div>)
    }
}

export default LogoutComponent;