import './loader.css';

function LoaderComponent(props) {
        
    //Build loader element
    var loader = document.createElement('div');
    loader.id = 'loader';
    loader.classList = 'loader-container';
    loader.innerHTML = '<div class="loader"></div>'
    
    let loaderDiv = document.getElementById('loader')

    //Add or remove loader element from body
    if(props.loading){
        if(!loaderDiv){
            document.body.appendChild(loader);
        }
    } else {
        if(loaderDiv){
            document.body.removeChild(loaderDiv);
        }
    }

    return null;

}

export default LoaderComponent;