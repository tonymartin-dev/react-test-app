import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import UserMenuComponent from './user-menu.cmp';

//Local imports
import './header.css';

export default class HeaderComponent extends Component {

    render() {

        return (<header id="header">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link to="/blog" className="nav-link">Blog</Link>
                        </li>
                    </ul>
                
                    {this.props.user && this.props.user.name ? (
                        <UserMenuComponent logIn={this.props.logIn} user={this.props.user} />
                    ):(null)}
                </div>
            </nav>
        </header>);
    }
};