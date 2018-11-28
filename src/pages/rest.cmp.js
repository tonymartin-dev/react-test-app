import React, { Component}                          from 'react';

function TheTitle(){
    return <h1>Requests</h1>
}

function LoadingTpl(){ 
    return <p>Loading!</p>
};

function InputTpl(props){
    return <div>
        <input type="text" onChange={(ev) => { props.setState({input: ev.target.value}); props.onInputChange(ev.target.value)}} value={props.state.input} /> 
        Selected: {props.state.input}
    </div>
}

function ListUsers(props){

    let list = [];

    for (const user of props.users) {
        console.log(user[props.field])
        list.push(<li key={user.id}>{ user[props.field] }</li>)
    }

    return list;
}

function ListPosts(props){

    let list = [];

    for (const post of props.posts) {
        //console.log(post)
        list.push(<li key={post.id}>
            <h4>{ post.title }</h4>
            <p>{ post.body }</p>
        </li>)
    }

    return list;
}

function ListTodos(props){

    let list = [];

    for (const todo of props.todos) {
        //console.log(post)
        list.push(<li key={todo.id}>
            <p>
                <input type="checkbox" disabled { todo.completed ? 'checked' : '' }></input>
                { todo.title }
            </p>
        </li>)
    }

    return list;
}

export default class RestComponent extends Component {
    
    state = { isLoading: true };
    requestList;
    selectedItem = 'users'

    render() {

        var vm = this;


        function request(method, params){
            
            let baseUrl = 'https://jsonplaceholder.typicode.com/'+method;
            let url = baseUrl + (params ? '?' : '');
            if (params){
                for (const paramName in params) {
                    const paramValue = params[paramName];
                    if(paramName && paramValue){
                        url = url + paramName + '=' + paramValue + '&';
                    }
                }
                url = url.slice(0,-1)
            }
            
            fetch(url)
                .then(rawResponse => rawResponse.json())
                .then(response => {
                    console.log('REQUEST: ' + url , {Response: response});
                    vm.requestList = response;
                    vm.setState(() => {        //To use the previous state, we don't pass an object as argument of setState(). Instead, we use a function whose argument is the previous state
                        return {
                            isLoading: false
                        };
                    })
                });
        }

        if(vm.requestList == undefined) {
            request(vm.selectedItem)
        }

        vm.selectItem = function(item){
            vm.setState(() => {
                return {
                    isLoading: true,
                    input: '1'
                };
            })
            vm.selectedItem = item;
            request(item)
        }

        vm.onInputChange = function (value, method){
            request(method, {userId: value})
        }

        return(
            <div>
                <TheTitle /> 

                { vm.state.isLoading ? (
                    LoadingTpl()
                ) : (

                    <div>
                        <button className="btn" onClick={()=>vm.selectItem('users')}>USERS</button>
                        <button className="btn" onClick={()=>vm.selectItem('posts')}>POSTS</button>
                        <button className="btn" onClick={()=>vm.selectItem('todos')}>TODOS</button>

                        <ol style={{listStyle: 'none'}}>
                            { vm.selectedItem == 'users' ? (
                                <div>
                                    <h3>Users</h3>
                                    <ListUsers users={vm.requestList} field="name" />
                                </div>
                            ):(null) }
                            { vm.selectedItem == 'posts' ? (
                                <div>
                                    <h3>Posts</h3>
                                    User: <input type="text" onChange={(ev) => { vm.setState({input: ev.target.value}); vm.onInputChange(ev.target.value, 'posts')}} value={vm.state.input} /> Selected: {vm.state.input}
                                    <br/>
                                    { vm.requestList.length > 0 ? (
                                        <ListPosts posts={vm.requestList} />
                                    ) : (
                                        <p>No posts found for the user ID { vm.state.input }</p>
                                    )}
                                </div>
                            ):(null)}
                            { vm.selectedItem == 'todos' ? (
                                <div>
                                    <h3>Posts</h3>
                                    User: <input type="text" onChange={(ev) => { vm.setState({input: ev.target.value}); vm.onInputChange(ev.target.value, 'todos')}} value={vm.state.input} /> Selected: {vm.state.input}
                                    <br/>
                                    { vm.requestList.length > 0 ? (
                                        <ListPosts posts={vm.requestList} />
                                    ) : (
                                        <p>No posts found for the user ID { vm.state.input }</p>
                                    )}
                                </div>
                            ):(null)}
                            
                        </ol>
                    </div>
                )}
            </div>
        )
        


    }
}