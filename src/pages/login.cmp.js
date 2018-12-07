import React from 'react';

function LoginComponent() {
     
    return <div id="player">
        <h1>Login component</h1>
        <form action="/login" method="post">
            <div>
                <label>Username:</label>
                <input type="text" name="username"/>
            </div>
            <div>
                <label>Password:</label>
                <input type="password" name="password"/>
            </div>
            <div>
                <input type="submit" value="Log In"/>
            </div>
        </form>
    </div>

}

export default LoginComponent;