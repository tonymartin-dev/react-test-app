import React from 'react';
import './loader.css';

function LoaderComponent(props) {
        
    var loader = document.createElement('h1');
    loader.id = 'loader';
    loader.classList = 'loader-container';
    loader.innerHTML = '<div class="loader"></div>'
    console.log('loader:', loader);

    if(props.loading){
        document.body.appendChild(loader);
    } else {
        let loaderDiv = document.getElementById('loader')
        if(loaderDiv){
            document.body.removeChild(loaderDiv);
        }
    }

    return null;

}

export default LoaderComponent;