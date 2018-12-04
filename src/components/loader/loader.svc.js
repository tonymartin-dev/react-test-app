import React from "react";
import ReactDOM from "react-dom";

import "./loader.css";

function loaderSvc(showLoader){

    function loaderTpl(){
        return <div id="loader" className="loader-container">
            <div className="loader"></div>
        </div>
    }

    let loaderContainer = document.getElementById('loader-layer');
    let loaderDiv   = document.getElementById('loader')

    //Add or remove loader element from body
    if(showLoader){
        if(!loaderDiv){
            ReactDOM.render( loaderTpl(),  loaderContainer);
        }
    } else {
        if(loaderDiv){
            ReactDOM.unmountComponentAtNode(loaderContainer);
        }
    }


}

export default loaderSvc