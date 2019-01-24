//Dependency imports
import React, { Component}  from 'react';
import { Route, Switch }    from 'react-router-dom';

//Components
import HeaderComponent      from './common/header.cmp'
import LoginComponent       from './pages/login.cmp';
import SigninComponent      from './pages/signin.cmp';
import ProfileComponent     from './pages/profile.cmp'
import BlogComponent        from './pages/blog.cmp'
import FooterComponent      from './common/footer.cmp'

//Services
import http from './services/http.svc';

//Local imports
import './App.css';

export default class App extends Component {
    
    constructor(props){

        super(props);

        var vm = this;
        
        vm.state = { user: null, isLoggedIn: false };

        let token = http.getToken();
        
        let url = 'http://localhost:3100/';
        let config = {
            method: 'POST',
            service: 'users/refreshToken',
            headers: {
                Authorization: 'Bearer ' + token
            }
        }

        vm.refreshToken =  function(isFirst){
            let token = http.getToken();
            if(token){
                http.request(url, config).then(
                    res => {
                        var token = res.token;
                        if(token){
                            console.log('[REFRESH TOKEN SUCCESS]', res);
                            document.cookie = 'token='+token;
                            vm.setState({user: res.user});
                            vm.setState({isLoggedIn: true})
                        } else {
                            console.log('[REFRESH TOKEN ERROR]. Deleting cookie...', res);
                            document.cookie = 'token=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
                            if(vm.refreshTokenInterval)
                                window.clearInterval(vm.refreshTokenInterval)
                            if(isFirst)
                                vm.setState({isLoggedIn: false})
                            else
                                vm.setState({isLoggedIn: 'expired'})
                        }
                    },
                    err=> {
                        console.log('[REFRESH TOKEN ERROR] Server error.', err)
                        if(vm.refreshTokenInterval)
                            window.clearInterval(vm.refreshTokenInterval)
                        vm.setState({isLoggedIn: 'error'})
                    }
                );
            } else{
                console.log('[REFRESH TOKEN ERROR]. No token to refresh')
                if(vm.refreshTokenInterval)
                    window.clearInterval(vm.refreshTokenInterval)
                vm.setState({isLoggedIn: false})
            }
            
        }

        vm.refreshToken();

    }

    //Component's template
    render() {

        var vm = this;

        function loadUser(user){
            vm.setState({user: user});
        }
        
        function logIn(refresh){
            if(refresh ===undefined) refresh = true;
            if(refresh){
                vm.setState({isLoggedIn: true});
                //vm.refreshToken();
                window.clearInterval(vm.refreshTokenInterval)
                vm.refreshTokenInterval = window.setInterval(vm.refreshToken,270000);                
            } else {
                vm.setState({isLoggedIn: 'loggedOut'});
                window.clearInterval(vm.refreshTokenInterval)
            }
        }

        return (
            <div>

                {vm.state.isLoggedIn === true ? (
                    <div>
                        <HeaderComponent logIn={logIn} user={this.state.user}/>
                        
                        <div id="container">
                            <Switch>
                                <Route path="/"   exact render={ props=> <LoginComponent logIn={logIn} loadUser={loadUser}  {...props} /> } />
                                <Route path="/signin"   logIn={logIn} component={ SigninComponent }/>
            
                                <Route path="/blog"     render={ props=><BlogComponent user={this.state.user} {...props} /> } />
                                {/*<Route path="/blog"     logIn={logIn} loadUser={loadUser} component={ BlogComponent }/>*/}
                                <Route path="/profile"  render={ props=><ProfileComponent logIn={logIn} user={this.state.user}  {...props} /> } />
                                <Route render={ () => (<h1>404</h1>) } />
                            </Switch>
                        </div>
                    </div>
                ):(
                    <div id="container">
                        {vm.state.isLoggedIn === false ? (
                                <Route path="/"   render={ props=><LoginComponent logIn={logIn} loadUser={loadUser}  {...props} /> }/>
                        ):null}
                        {vm.state.isLoggedIn === 'expired' ? (
                                <Route path="/"   render={ props=><LoginComponent logIn={logIn} loadUser={loadUser} msg="Your session expired. Please, log in again."  {...props} /> }/>
                        ):null}
                        {vm.state.isLoggedIn === 'error' ? (
                                <Route path="/"   render={ props=><LoginComponent logIn={logIn} loadUser={loadUser} msg="There was an error with your session. Please, try again later."  {...props} /> }/>
                        ):null}
                        {vm.state.isLoggedIn === 'loggedOut' ? (
                                <Route path="/"   render={ props=><LoginComponent logIn={logIn} loadUser={loadUser} msg="You have successfuly logged out."  {...props} /> }/>
                        ):null}
                    </div>
                )}

                <FooterComponent />

            </div>

        )
        
    }
}