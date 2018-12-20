import React, {Component} from 'react';
import { Link } from 'react-router-dom';

export default class HeaderComponent extends Component {
    
    render() {

        return (<header id="header">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        {/*<li className="nav-item">
                            <Link to="/" className="nav-link">Home</Link>
                        </li>*/}
                        <li className="nav-item">
                            <Link to="/player" className="nav-link">Player</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/function" className="nav-link">Function</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/rest" className="nav-link">Rest</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/blog" className="nav-link">Blog</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/logout" className="nav-link">Log Out</Link>
                        </li>
                    </ul>
                    <div id="user-resume">
                        <img height="30" src="generic-user.jpg" alt="UserLogo"></img>
                        {this.props.user && this.props.user.name ? (
                            <span>{this.props.user.name}</span>
                        ):(
                            <Link to="/">Log In</Link>
                        )}
                    </div>
                </div>
            </nav>
        </header>);
    }
};