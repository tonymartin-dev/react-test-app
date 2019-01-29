//Dependency imports
import React, { Component}  from 'react';
import { Route, Switch }    from 'react-router-dom';

//Components
import HeaderComponent      from './common/header.cmp'
import LoginComponent       from './pages/login.cmp';
import SignupComponent      from './pages/signup.cmp';
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
        
        vm.state = { user: null, status: false };
       
        let config = {
            method: 'POST',
            service: 'users/refreshToken'
        }

        vm.refreshToken =  function(isFirst){
            let token = http.getToken();
            if(token){
                http.request(config).then(
                    res => {
                        var token = res.token;
                        if(token){
                            console.log('[REFRESH TOKEN SUCCESS]', res);
                            document.cookie = 'token='+token;
                            vm.setState({user: res.user});
                            vm.setState({status: true})
                        } else {
                            console.log('[REFRESH TOKEN ERROR]. Deleting cookie...', res);
                            document.cookie = 'token=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
                            if(vm.refreshTokenInterval)
                                window.clearInterval(vm.refreshTokenInterval)
                            if(isFirst)
                                vm.setState({status: false})
                            else
                                vm.setState({status: 'expired'})
                        }
                    },
                    err=> {
                        console.log('[REFRESH TOKEN ERROR] Server error.', err)
                        if(vm.refreshTokenInterval)
                            window.clearInterval(vm.refreshTokenInterval)
                        vm.setState({status: 'error'})
                    }
                );
            } else{
                console.log('[REFRESH TOKEN ERROR]. No token to refresh')
                if(vm.refreshTokenInterval)
                    window.clearInterval(vm.refreshTokenInterval)
                vm.setState({status: false})
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

        function setStatus(status){
            vm.setState({status: status});
        }
        
        function logIn(refresh){
            if(refresh ===undefined) refresh = true;
            if(refresh){
                vm.setState({status: true});
                //vm.refreshToken();
                window.clearInterval(vm.refreshTokenInterval)
                vm.refreshTokenInterval = window.setInterval(vm.refreshToken,270000);                
            } else {
                vm.setState({status: 'loggedOut'});
                window.clearInterval(vm.refreshTokenInterval)
            }
        }

        return (
            <div>

                {vm.state.status === true ? (   //If loggedIn, show components and header
                    <div>
                        <HeaderComponent logIn={logIn} user={this.state.user}/>
                        
                        <div id="container">
                            <Switch>
                                <Route path="/"   exact render={ props=> <LoginComponent logIn={logIn} loadUser={loadUser}  {...props} /> } />
                                <Route path="/blog"     render={ props=><BlogComponent user={this.state.user} {...props} /> } />
                                <Route path="/profile"  render={ props=><ProfileComponent logIn={logIn} user={this.state.user}  {...props} /> } />
                                <Route render={ () => (<h1>404: Page not found</h1>) } />
                            </Switch>
                        </div>
                    </div>
                ):(                                 //If no loggedIn, only allow login and singin components.
                    <div id="container">
                        <Switch>
                            <Route path="/" exact   render={ props=><LoginComponent logIn={logIn} loadUser={loadUser} status={vm.state.status} {...props} /> }/>
                            <Route path="/signup"   render={ props=><SignupComponent logIn={logIn} setStatus={setStatus} {...props} /> }/>
                            <Route render={ props => <LoginComponent logIn={logIn} loadUser={loadUser} status={vm.state.status} {...props} /> } />
                        </Switch>
                    </div>
                )}

                <FooterComponent />

            </div>

        )
        
    }
}