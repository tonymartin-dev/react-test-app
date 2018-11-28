//Dependency imports
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";
import * as serviceWorker from './serviceWorker';


//Local imports
//import './Base.js';
import './index.css';

//Components
import App from './App';

//Vendor imports
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'jquery';
import 'popper.js';
import 'bootstrap';

//Element where components will be placed
const appView = document.getElementById("app-view");

//Adding components to DOM
ReactDOM.render(
    <Router>
        <App />
    </Router>, appView);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
