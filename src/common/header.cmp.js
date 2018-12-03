import React    from 'react';
import { Link } from 'react-router-dom';

function HeaderComponent(){
    return <header id="header">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link to="/" className="nav-link">Home</Link>
                    </li>
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
                </ul>
            </div>
        </nav>
    </header>;
}

export default HeaderComponent;