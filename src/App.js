//Dependency imports
import React, { Component}  from 'react';
import { Route }            from 'react-router-dom';

//Components
import HeaderComponent      from './common/header.cmp'
import HomeComponent        from './pages/home.cmp';
import LoginComponent       from './pages/login.cmp';
import LogoutComponent      from './pages/logout.cmp';
import SigninComponent      from './pages/signin.cmp';
import PlayerComponent      from './pages/player.cmp';
import RestComponent        from './pages/rest.cmp'
import BlogComponent        from './pages/blog.cmp'
import FooterComponent      from './common/footer.cmp'

//Services
import http         from './services/http.svc';

//Local imports
import './App.css';

export default class App extends Component {
    
    constructor(props){

        super(props);

        var vm = this;
        
        vm.state = { user: null };

        let token = http.getToken();
        
        let url = 'http://localhost:3100/';
        let config = {
            method: 'POST',
            service: 'users/refreshToken',
            headers: {
                Authorization: 'Bearer ' + token
            }
        }

        function refreshToken(){
            let token = http.getToken();
            if(token){
                http.request(url, config).then(
                    res => {
                        var token = res.token;
                        if(token){
                            console.log('[REFRESH TOKEN SUCCESS]', res);
                            document.cookie = 'token='+token;
                        } else {
                            console.log('[REFRESH TOKEN ERROR]. Deleting cookie...', res);
                            document.cookie = 'token=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
                            window.clearInterval(refreshTokenInterval)
                        }
                    },
                    ()=> console.log('Error')
                );
            } else
                console.log('No token to refresh')
        }

        var refreshTokenInterval = window.setInterval( refreshToken,599999)


    }

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
                    <Route path="/logout"   component={ LogoutComponent }/>
                    <Route path="/signin"   component={ SigninComponent }/>
                </div>

                <FooterComponent />

            </div>
        )
        
    }
}