//Services
var http=require('../services/http.svc');

var users = [];

function getUsers(){

        let config = { 
            service: 'users'
        }

        return http.request(config)


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