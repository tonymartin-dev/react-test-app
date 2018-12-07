//Dependency imports
import React, { Component}  from 'react';
import { Route }            from 'react-router-dom';

//Components
import HeaderComponent      from './common/header.cmp'
import HomeComponent        from './pages/home.cmp';
import LoginComponent       from './pages/login.cmp';
import PlayerComponent      from './pages/player.cmp';
import RestComponent        from './pages/rest.cmp'
import BlogComponent        from './pages/blog.cmp'
import FooterComponent      from './common/footer.cmp'

//Local imports
import './App.css';

export default class App extends Component {
    
    //Component's template
    render() {
        
        return (
            <div>
                
                <HeaderComponent />

                <div id="container">
                    <Route path="/"   exact component={ LoginComponent }/>
                    <Route path="/home"     component={ HomeComponent }/>
                    <Route path="/player"   component={ PlayerComponent }/>
                    <Route path="/function" render={ () => (<h1>Function instead of component</h1>) }/>
                    <Route path="/rest"     component={ RestComponent }/>
                    <Route path="/blog"     component={ BlogComponent }/>
                </div>

                <FooterComponent />

            </div>
        )
        
    }
}