import React, {Component} from 'react';

//Components
import SelectComponent      from '../components/select.cmp'
import ListPostsComponent   from '../components/list-posts.cmp'

//Services
import http             from '../services/http.svc';
import users            from '../services/users.svc';
import ModalService     from '../components/modal/modal.svc'
import LoaderService    from '../components/loader/loader.svc'

//Local imports
import './blog.css';

export default class BlogComponent extends Component {

    constructor(props){

        super(props);
        
        var vm =this;
        
        vm.state = { 
            isLoading: true,
            editPost: null,
            userList: [],
        };

        //vm.setState({isLoading: true});
        let isConstructor = true;

        console.log('%c[COMPONENT CONSTRUCTOR INIT]:%c BLOG', 'background-color: blue;', {state: vm.state})
        
        vm.getPosts = function(params){
            vm.setState({isLoading: true});
            //vm.state.isLoading = true;
            
            let token = http.getToken();
            let { history } = this.props;            
            if(!token)  history.push('/login');
            
            let url = 'http://localhost:3100/';
            
            let config = {
                method: 'GET',
                service: 'posts',
                params: {
                    userId: params && params.userId ? params.userId : null
                },
                headers: {
                    Authorization: 'Bearer ' + token
                }
            }
            http.request(url, config).then(
                res => {
                    vm.postList = res;
                    vm.postList.forEach(function(post){
                        post.user = users.userName(post.userId, vm.usersInfo).name
                    });
                    vm.setState({userList: vm.usersList, isLoading: false});
                    //vm.state.userList  = vm.usersList;
                    //vm.state.isLoading = false;
                    if(isConstructor){
                        console.log('%c[COMPONENT CONSTRUCTOR END]:%c BLOG', 'background-color: blue;', {state: vm.state});
                    }
                    isConstructor = false;
                },
                err => {
                    vm.setState({isLoading: false});
                    //vm.state.isLoading = false;
                    if(isConstructor){
                        console.log('%c[COMPONENT CONSTRUCTOR END]:%c BLOG', 'background-color: blue;', {Error: err});
                    }
                    isConstructor = false;
                }
            );

        }

        //Get the users list and then get the posts list
        users.getUsers().then(
            res => {
                
                vm.usersInfo = res;

                let users = [];
                res.forEach(user => {
                    users.push({
                        name: user.name,
                        value: user._id
                    });
                });
                vm.usersList = users;

                vm.getPosts();
            },
            err => {
                vm.setState({isLoading: false});
                console.log('ERROR: ' + err);
                if(err.message === 'Unauthorized'){
                    var modal = ModalService();
                    var config ={
                        title:       'Unauthorized',
                        body:        'Your session expired. Please, log in again.',
                        isError:     true
                    }
                    modal.openSimpleModal(config).then(
                        () => {
                            let { history } = vm.props;
                            history.push('/');
                        }
                    );
                    
                }
            }
        )

        //Create a new modal instance.
        vm.modal = ModalService();
        console.log('Modal instance', vm.modal)
        
    } //End of constructor

    postList = [];
    modalData = {title: '', body: '', showCancel: false, isError: false};
    
    render() {
        
        var vm = this;

        console.log('   %c[COMPONENT RENDER]:%c BLOG', 'background-color: darkcyan;', '', vm.state)
        LoaderService(vm.state.isLoading);

        function createPost(){

            let config = {
                service: 'posts',
                method:  'POST',
                headers: {
                    Authorization: 'Bearer ' + http.getToken()
                },
                body:{
                    title:  document.getElementById('new-post-title').value,
                    body:   document.getElementById('new-post-body').value,
                    userId: vm.props.user._id
                    //userId: document.getElementById('new-post-user-id').value
                }
            }

            console.log('Creating post: ', {data: config.body});
            
            vm.setState({createPost: true, isLoading: true})

            http.request('http://localhost:3100/', config).then(
                res => {
                    let newPost = res;
                    newPost.user = users.userName(config.body.userId, vm.usersInfo).name;
                    newPost.id = vm.postList.length +1;
                    vm.postList.push(newPost);
                    vm.setState({createPost: false, isLoading: false});
                    console.log('[POSTS UPDATED]', vm.postList);
                }
            )

        }

        function editPost(postId){
            vm.setState(() => {
                return {
                    editPost: postId
                };
            });
        }

        function cancelPostEdit(){
            vm.setState(() => {
                return {
                    editPost: null
                };
            });
        }

        function savePost(post, element){
            let edited = {
                title:  document.getElementById(element.title).value,
                body:   document.getElementById(element.body).value
            }
            let original = {
                title:  document.getElementById(element.title).defaultValue,
                body:   document.getElementById(element.body).defaultValue
            }

            if(edited.title.length === 0 || edited.body.length === 0){
                alert('Please, insert a title and a body for your post.')
                return;
            }

            if(edited.title === original.title && edited.body === original.body){
                alert('No changes detected');
                return;
            }
            
            console.log('Editing post #'+post.id+': ', edited);
            
            vm.setState({isLoading: true});
            
            let url = 'http://localhost:3100/';
            let config = {
                method: 'PUT',
                service: 'posts/?id='+post.id,
                headers: {
                    Authorization: 'Bearer ' + http.getToken()
                },
                body: {
                    title:  edited.title,
                    body:   edited.body,
                    userId: post.userId
                }
            }
            http.request(url, config).then(
                res => {

                    for (let i = 0; i < vm.postList.length; i++) {
                        let element = vm.postList[i];
                        if(element.id === post._id){

                            element.title = res.title;
                            element.body = res.body;

                            vm.setState(() => {
                                return {
                                    isLoading: false,
                                    editPost: null
                                }
                            });

                            return;
                        }
                        
                    }
                    

                },
                () => {

                    alert('Error saving your post. Please, try it again later.')
                    vm.setState({isLoading: false});                    
                }
            );
        }

        function showDeleteModal(postData){
            var config ={
                title:       'Delete Post',
                body:        'Are you sure you want to delete this post?',
                isError:     true,
                showCancel:  true,
                data:        postData,
            }
            vm.modal.openSimpleModal(config).then(
                res => {
                    console.log('Modal closed', res)
                    deletePost(res.id, res.index);
                },
                () => {
                    console.log('Modal dismissed')
                }
            );
        }

        function deletePost(postId, postIndex){
            vm.setState({isLoading: true})
            let url = 'http://localhost:3100/';
            let config = {
                method: 'DELETE',
                service: 'posts/'+postId,
                headers: {
                    Authorization: 'Bearer ' + http.getToken()
                },
            }
            http.request(url, config).then(
                ()=>{
                    vm.postList.splice(postIndex, 1);
                    console.log('   [POST DELETED] #'+postId, vm.postList)
                    vm.setState({isLoading: false});
                    var config ={
                        title:       'Delete Post',
                        body:        'Your post was deleted.'
                    }
                    vm.modal.openSimpleModal(config)
                    vm.setState({isLoading: false});
                },
                ()=>{
                    vm.setState({isLoading: false});
                    var config ={
                        title:      'Delete Post',
                        body:       'There was an error. Your post couldn\'t be deleted.',
                        isError:    true
                    }
                    vm.modal.openSimpleModal(config)
                }
            )
        }
        
        let postAPI = {
            create: function(){

                let config = {
                    service: 'posts',
                    method:  'POST',
                    headers: {
                        Authorization: 'Bearer ' + http.getToken()
                    },
                    body:{
                        title:  document.getElementById('new-post-title').value,
                        body:   document.getElementById('new-post-body').value,
                        userId: vm.props.user._id
                        //userId: document.getElementById('new-post-user-id').value
                    }
                }
    
                console.log('Creating post: ', {data: config.body});
                
                vm.setState({createPost: true, isLoading: true})
    
                http.request('http://localhost:3100/', config).then(
                    res => {
                        let newPost = res;
                        newPost.user = users.userName(config.body.userId, vm.usersInfo).name;
                        newPost.id = vm.postList.length +1;
                        vm.postList.push(newPost);
                        vm.setState({createPost: false, isLoading: false});
                        console.log('[POSTS UPDATED]', vm.postList);
                    }
                )
    
            },
            edit: function(postId){
                vm.setState(() => {
                    return {
                        editPost: postId
                    };
                });
            },
            cancelEdit: function(){
                vm.setState(() => {
                    return {
                        editPost: null
                    };
                });
            },
            save: function(post, element){
                let edited = {
                    title:  document.getElementById(element.title).value,
                    body:   document.getElementById(element.body).value
                }
                let original = {
                    title:  document.getElementById(element.title).defaultValue,
                    body:   document.getElementById(element.body).defaultValue
                }
    
                if(edited.title.length === 0 || edited.body.length === 0){
                    alert('Please, insert a title and a body for your post.')
                    return;
                }
    
                if(edited.title === original.title && edited.body === original.body){
                    alert('No changes detected');
                    return;
                }
                
                console.log('Editing post #'+post.id+': ', edited);
                
                vm.setState({isLoading: true});
                
                let url = 'http://localhost:3100/';
                let config = {
                    method: 'PUT',
                    service: 'posts/?id='+post.id,
                    headers: {
                        Authorization: 'Bearer ' + http.getToken()
                    },
                    body: {
                        title:  edited.title,
                        body:   edited.body,
                        userId: post.userId
                    }
                }
                http.request(url, config).then(
                    res => {
    
                        for (let i = 0; i < vm.postList.length; i++) {
                            let element = vm.postList[i];
                            if(element.id === post._id){
    
                                element.title = res.title;
                                element.body = res.body;
    
                                vm.setState(() => {
                                    return {
                                        isLoading: false,
                                        editPost: null
                                    }
                                });
    
                                return;
                            }
                            
                        }
                        
    
                    },
                    () => {
    
                        alert('Error saving your post. Please, try it again later.')
                        vm.setState({isLoading: false});                    
                    }
                );
            },
            deleteModal: function(postData){
                var config ={
                    title:       'Delete Post',
                    body:        'Are you sure you want to delete this post?',
                    isError:     true,
                    showCancel:  true,
                    data:        postData,
                }
                vm.modal.openSimpleModal(config).then(
                    res => {
                        console.log('Modal closed', res)
                        this.delete(res.id, res.index);
                    },
                    () => {
                        console.log('Modal dismissed')
                    }
                );
            },
            delete: function deletePost(postId, postIndex){
                vm.setState({isLoading: true})
                let url = 'http://localhost:3100/';
                let config = {
                    method: 'DELETE',
                    service: 'posts/'+postId,
                    headers: {
                        Authorization: 'Bearer ' + http.getToken()
                    },
                }
                http.request(url, config).then(
                    ()=>{
                        vm.postList.splice(postIndex, 1);
                        console.log('   [POST DELETED] #'+postId, vm.postList)
                        vm.setState({isLoading: false});
                        var config ={
                            title:       'Delete Post',
                            body:        'Your post was deleted.'
                        }
                        vm.modal.openSimpleModal(config)
                        vm.setState({isLoading: false});
                    },
                    ()=>{
                        vm.setState({isLoading: false});
                        var config ={
                            title:      'Delete Post',
                            body:       'There was an error. Your post couldn\'t be deleted.',
                            isError:    true
                        }
                        vm.modal.openSimpleModal(config)
                    }
                )
            }
        }

        function getPostsFiltered(){
            let selectedUserId = document.getElementById('post-user-id').value;
            console.log('Getting post from user #'+ selectedUserId);
            if(selectedUserId !== 'All'){
                vm.getPosts({userId: selectedUserId})
            } else {
                vm.getPosts()
            }
        }

        return <div id="Blog">
                        
            <h1>Bl-cmp</h1>

            <div className="filter">
                <div className="filter-title">
                    <span>Filter by userID: </span>
                </div>
                <SelectComponent options={vm.state.userList} id={"post-user-id"} null="All"/>
                <div className="btn-group">
                    <button className="btn btn-info" onClick={()=>getPostsFiltered()}>GET POSTS</button>
                    <button className="btn btn-light" onClick={()=>vm.setState({createPost: true})}>NEW POST</button>
                </div>
            </div>

            {/*CREATE POST*/}
            {vm.state.createPost ? (
                <div id="new-post" className="posts-list">
                    <h4>Create Post</h4>
                    <input className="title-edit" id="new-post-title" placeholder="Title"></input>
                    <textarea className="body-edit" id="new-post-body" placeholder="Message"></textarea>
                    <div className="post-footer">
                        <strong>Author: </strong> {vm.props.user.name}
                        <div className="btn-group">
                            <button className="btn btn-success" onClick={() => createPost() }> Post </button>
                            <button className="btn btn-secondary" onClick={() =>  vm.setState({createPost: false})}> Cancel </button>
                        </div>
                    </div>
                </div>
            ):(null)}
            
            {/*POSTS LIST*/}
            { vm.postList.length > 0 ? (                
                <ul className="posts-list">
                    <i className="post-number">Showing {vm.postList.length} posts.</i>
                    <ListPostsComponent posts={vm.postList} postAPI={postAPI} state={vm.state} user={vm.props.user}/>
                </ul>
            ):(
                <div>No posts found</div>
            )
            }
        </div>
    }

};