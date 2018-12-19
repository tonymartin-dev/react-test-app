//Services
var http=require('../services/http.svc');

var users = [];

function getUsers(){
    var promise = new Promise (function(resolve, reject){

        let config = { 
            method: 'GET', 
            service: 'users',
            headers: {
                Authorization: 'Bearer ' + http.getToken()
            }
        }

        http.request('http://localhost:3100/', config).then(
            res => {
                console.log('   USERS: ', res);
                users = res;
                resolve(res);
            }
        );

    })

    return promise;
}

function userName(userId, userList){
    var user= userList.find(function(user){
        return user._id === userId
    });
    return user;
}

module.exports = {
    getUsers:   getUsers,
    userName:   userName,
    users:      users
};