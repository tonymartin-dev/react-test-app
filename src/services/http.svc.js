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
function request(url, config){
            
    //Set request method
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
    
    //Add params for GET requests (if any)
    let requestUrl;
    if (method === 'GET' && config.params){
        
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
    requestConfig.headers = {};
    if(config.headers){
        requestConfig.headers = config.headers;
    }
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
            .then(rawResponse => rawResponse.json())
            .then(
                response => {
                    console.log('[REQUEST SUCCESS]', {url: requestUrl, config: requestConfig});
                    console.log('                 ', {Response: response});
                    resolve(response);
                },
                error => {
                    console.log('[REQUEST FAILURE]', {url: requestUrl, config: requestConfig});
                    console.log('                 ', {Error: error});
                    reject(error);
                }
            );
    });

    return promise;
}


module.exports = {
    test:       test,
    request:    request
};