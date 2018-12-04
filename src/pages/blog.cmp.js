import React, {Component} from 'react';
import ReactDOM from "react-dom";

//Components
import LoaderComponent  from '../components/loader.cmp'
import SelectComponent  from '../components/select.cmp'
import ModalComponent   from '../components/modal.cmp'

//Services
import http     from '../services/http.svc';
import users    from '../services/users.svc';

//Local imports
import './blog.css';

function ListPosts(props){

    let list = [];

    //for (const post of props.posts) {
    for(let index = props.posts.length -1; index >= 0; index--){

        let post = props.posts[index];
        //console.log(post)
        let editId = {
            title:  'title-edit-' + post.id,
            body:   'body-edit-' + post.id
        }
        list.push(<li key={post.id}>
            
            {props.state.editPost === post.id ? (
                <div className="post">
                    <input className="title-edit" id={editId.title} defaultValue={ post.title } placeholder="Title"></input>
                    <textarea className="body-edit" id={editId.body} defaultValue={ post.body } placeholder="Message"></textarea>
                </div>
            ) : (
                <div className="post">
                    <h4>{ post.title }</h4>
                    <p>{ post.body }</p>
                </div>
            )}
            
            <div className="post-footer">
                <span><strong>Author:</strong> { post.user }</span>
                {props.state.editPost !== post.id ?(
                    <div className="btn-group">
                        <button className="edit-post btn btn-ligth" onClick={() => props.postAPI.edit(post.id, editId)}>Edit</button>
                        <button className="edit-post btn btn-info" onClick={() => props.postAPI.delete({id: post.id, index: index})}>Delete</button>
                    </div>
                ):(
                    <div className="btn-group">
                        <button className="edit-post btn btn-success" onClick={() => props.postAPI.save({id: post.id, user: post.userId}, editId)}> Save </button>
                        <button className="edit-post btn btn-secondary" onClick={() => props.postAPI.cancel(post.id, editId)}> Cancel </button>
                    </div>
                )}
            </div>

        </li>)
    }

    return list;
}

export default class RestComponent extends Component {

    constructor(props){

        super(props);
        var vm =this;
        
        vm.state = { 
            isLoading: true,
            editPost: null,
            userList: [],
            showModal: false
        };

        let isConstructor = true;

        console.log('%c[COMPONENT CONSTRUCTOR INIT]:%c BLOG', 'background-color: blue;', {state: vm.state})
        
        vm.getPosts = function(params){
            
            let url = 'https://jsonplaceholder.typicode.com/';
            let config = {
                method: 'GET',
                service: 'posts',
                params: {
                    userId: params && params.userId ? params.userId : null
                }
            }
            http.request(url, config).then(
                res => {
                    vm.postList = res;
                    vm.postList.forEach(function(post){
                        post.user = users.userName(post.userId, vm.usersInfo).name
                    });
                    vm.setState(() => { return {isLoading: false, userList: vm.usersList} });
                    if(isConstructor){
                        console.log('%c[COMPONENT CONSTRUCTOR END]:%c BLOG', 'background-color: blue;', {state: vm.state});
                    }
                    isConstructor = false;
                },
                err => {
                    vm.setState(() => { return {isLoading: false} });
                    if(isConstructor){
                        console.log('%c[COMPONENT CONSTRUCTOR END]:%c BLOG', 'background-color: blue;', {Error: err});
                    }
                    isConstructor = false;
                }
            );

        }

        users.getUsers().then(
            res => {
                
                vm.usersInfo = res;

                let users = [];
                res.forEach(user => {
                    users.push({
                        name: user.name,
                        value: user.id
                    });
                });
                vm.usersList = users;

                vm.getPosts();
            }
        )
        
    }

    postList = [];
    modalData = {title: '', body: '', showCancel: false, isError: false};
    
    render() {
        
        var vm = this;

        console.log('   %c[COMPONENT RENDER]:%c BLOG', 'background-color: darkcyan;', '')

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
            
            let url = 'https://jsonplaceholder.typicode.com/';
            let config = {
                method: 'PUT',
                service: 'posts/'+post.user,
                body: {
                    id:     post.id,
                    title:  edited.title,
                    body:   edited.body,
                    userId: post.user
                }
            }
            http.request(url, config).then(
                res => {

                    for (let i = 0; i < vm.postList.length; i++) {
                        let element = vm.postList[i];
                        if(element.id === post.id){

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
                    vm.setState(() => {
                        return {
                            isLoading: false
                        }
                    });                    
                }
            );
        }
        
        let postAPI = {
            edit: editPost,
            save: savePost,
            delete: showDeleteModal,
            cancel: cancelPostEdit
        }

        function createPost(){

            let config = {
                service: 'posts',
                method:  'POST',
                body:{
                    title:  document.getElementById('new-post-title').value,
                    body:   document.getElementById('new-post-body').value,
                    userId: document.getElementById('new-post-user-id').value
                }
            }

            console.log('Creating post: ', {data: config.body});
            
            vm.setState({createPost: true})

            http.request('https://jsonplaceholder.typicode.com/', config).then(
                res => {
                    let newPost = res;
                    newPost.user = users.userName(config.body.userId, vm.usersInfo).name;
                    newPost.id = vm.postList.length +1;
                    vm.postList.push(newPost);
                    vm.setState({createPost: false});
                    console.log('[POSTS UPDATED]', vm.postList);
                }
            )

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

        function showDeleteModal(postId){
            vm.setState({showModal: true});
            var config ={
                title:       'Delete Post',
                body:        'Are you sure you want to delete this post?',
                isError:     true,
                showCancel:  true,
                info:        postId,
            }
            openModal(config)
        }

        function openModal(config){
            console.log('Modal')
            vm.modalData.title      = config.title;
            vm.modalData.body       = config.body;
            vm.modalData.isError    = config.isError;
            vm.modalData.showCancel = config.showCancel;
            vm.modalData.info       = config.info;
            vm.setState({showModal: true});
            
            //ReactDOM.render(ModalComponent, document.getElementById('modal-layer'))
        }

        function closeModal(action, info){
            vm.setState(()=>{return{showModal: false}});
            vm.modalData.title = '';
            vm.modalData.body = '';
            vm.modalData.isError = false;
            vm.modalData.showCancel = false;
            switch (action){
                case 'accept':
                vm.setState({isLoading: true})
                    console.log('accept', info);
                    let url = 'https://jsonplaceholder.typicode.com/';
                    let config = {
                        method: 'DELETE',
                        service: 'posts/'+info.id
                    }
                    http.request(url, config).then(
                        ()=>{
                            vm.postList.splice(info.index, 1);
                            console.log('   [POST DELETED] #'+info.index, vm.postList)
                            vm.setState({isLoading: false});
                            var config ={
                                title:       'Delete Post',
                                body:        'Your post was deleted.'
                            }
                            openModal(config)
                        }
                    )
                    break;
                case 'cancel':
                    console.log('cancel');
                    break;
                default:
                    console.log('close');
                    break;
            }
        }

        return <div id="Blog">
            
            <ModalComponent show={this.state.showModal} data={vm.modalData} onClose={(action, data)=> closeModal(action, data)} />
            <LoaderComponent loading={this.state.isLoading} />
            
            <h1>Bl-cmp</h1>

            {/*FILTER*/}
            <div className="filter">
                <span>Filter by userID: </span>
                <SelectComponent options={vm.state.userList} id={"post-user-id"} null="All"/>
                <div className="btn-group">
                    <button className="btn btn-info" onClick={()=>getPostsFiltered()}>GET POSTS</button>
                    <button className="btn btn-light" onClick={()=>vm.setState({createPost: true})}>NEW POST</button>
                    <button className="btn btn-light" onClick={()=>openModal({title: 'prueba', body: 'body'})}>MODAL</button>
                </div>
            </div>

            {/*CREATE POST*/}
            {vm.state.createPost ? (
                <div id="new-post" className="posts-list">
                    <h4>Create Post</h4>
                    <input className="title-edit" id="new-post-title" placeholder="Title"></input>
                    <textarea className="body-edit" id="new-post-body" placeholder="Message"></textarea>
                    <div className="post-footer">
                        <strong>Author: </strong><SelectComponent options={vm.state.userList} id={"new-post-user-id"} />
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
                    <ListPosts posts={vm.postList} postAPI={postAPI} state={this.state}/>                
                </ul>
            ):(
                <div>No posts found</div>
            )
            }
        </div>
    }

};