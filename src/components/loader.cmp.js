import './loader.css';

function LoaderComponent(props) {
        
    //Build loader element
    var loader = document.createElement('h1');
    loader.id = 'loader';
    loader.classList = 'loader-container';
    loader.innerHTML = '<div class="loader"></div>'

    //Add or remove loader element from body
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