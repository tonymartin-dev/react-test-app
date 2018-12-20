//Services
var http=require('../services/http.svc');

var users = [];

function getUsers(){

        let config = { 
            method: 'GET', 
            service: 'users',
            headers: {
                Authorization: 'Bearer ' + http.getToken()
            }
        }

        return http.request('http://localhost:3100/', config)


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