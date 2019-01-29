function test(){
    console.log('TESTING SERVICE')
}

/**
 * 
 * @param {string} url           = Base url
 * @param {Object} config
 * SUPPORTED ITEMS
 * @param {String} config.service = Service name
 */
function request(config){

    //Set default values
    let url = config.url || 'http://localhost:3100/';
    let headers = config.headers || {};
    headers.Authorization = headers.Authorization || 'Bearer ' + getToken();
    let method = config.method || 'GET';
    
    /**
     * Create url
     */
    let baseUrl;
    
    //Add Service
    if(config.service){
        baseUrl = url + config.service;        
    } else {
        baseUrl = url;
    }
    
    //Add params for GET or PUT requests (if any)
    let requestUrl;
    if ((method === 'GET' || method === 'PUT') && config.params){
        
        requestUrl = baseUrl + '?';
        
        for (const paramName in config.params) {
            const paramValue = config.params[paramName];
            if(paramName && paramValue){
                if(paramValue)
                requestUrl = requestUrl + paramName + '=' + paramValue + '&';
            }
        }
        //Delete last ampersand
        requestUrl = requestUrl.slice(0,-1)
    } else {
        requestUrl = baseUrl;
    }

    /**
     * Create config object
     */
    let requestConfig = {};

    //Add method
    requestConfig.method = method;

    //Add headers
    requestConfig.headers = headers || {};
    if(!requestConfig.headers["Content-Type"]){
        requestConfig.headers["Content-Type"] = "application/json; charset=utf-8";
    }

    //Add body in 
    if(method !== 'GET' && config.body){
        requestConfig.body = JSON.stringify(config.body);
    }

    /**
     * Make request
     */
    var promise = new Promise(function(resolve, reject){

        fetch(requestUrl, requestConfig)
            .then(rawResponse => {
                if (!rawResponse.ok)
                    throw Error(rawResponse.statusText);
                return rawResponse.json();
            })
            .then(
                response => {
                    console.log('   %c[REQUEST SUCCESS]%c', 'background-color: green;','', {url: requestUrl, config: requestConfig});
                    console.log('                    ', {Response: response});
                    resolve(response);                    
                },
                error => {
                    console.log('   %c[REQUEST FAILURE]%c', 'background-color: red;','', {url: requestUrl, config: requestConfig});
                    console.log('                    ', {Error: error});
                    reject(error);
                }
            )
            
    });

    return promise;
}

function getToken(){
    var cookies = document.cookie;
    if(!cookies)
        return;

    var cookiesArray = cookies.split(';')

    var cookiesObject = {};

    cookiesArray.forEach(function(cookie){
        let cookieLine = cookie.split('=');
        let key = cookieLine[0].trim();
        let value = cookieLine[1].trim();
        cookiesObject[key] = value;
    });

    return cookiesObject.token;
}


module.exports = {
    test:       test,
    request:    request,
    getToken:   getToken
};