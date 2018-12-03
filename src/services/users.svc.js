//Services
var http=require('../services/http.svc');

var users = [];

function getUsers(){
    var promise = new Promise (function(resolve, reject){

        http.request('https://jsonplaceholder.typicode.com/', { method: 'GET', service: 'users'}).then(
            res => {
                console.log('USERS: ', res);
                users = res;
                resolve(res);
            },
            err => {
                console.log('Error getting users: ', err);
                reject();
            }
        );

    })

    return promise;
}

getUsers();


function userName(userId){
    var promise = new Promise (function(resolve, reject){
        let url = 'https://jsonplaceholder.typicode.com/';
        let config= { 
            method: 'GET', 
            service: 'users', 
            params: {userId: userId}
        };
        http.request(url, config).then(
            res => {
                console.log('USER INFO: ', res);
                users = res;
                resolve(res);
            },
            err => {
                console.log('Error getting users: ', err);
                reject();
            }
        );

    })

    return promise;
}

module.exports = {
    getUsers:   getUsers,
    userName:   userName,
    users:      users
};