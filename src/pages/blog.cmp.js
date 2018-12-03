import React, {Component} from 'react';
import LoaderComponent from '../components/loader.cmp'
import SelectComponent from '../components/select.cmp'

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
            
            {props.state.editPost == post.id ? (
                <textarea className="title-edit" id={editId.title} defaultValue={ post.title }></textarea>
            ) : (
                <h4>{ post.title }</h4>
            )}
            {props.state.editPost == post.id ? (
                <textarea className="body-edit" id={editId.body} defaultValue={ post.body }></textarea>
            ) : (
                <p>{ post.body }</p>
            )}
            <p className="bottom">
                <span>User Id: { post.userId } - </span>
                {props.state.editPost != post.id ?(
                    <a className="edit-post" onClick={() => props.postAPI.edit(post.id, editId)}>Edit</a>
                ):(
                    <span> 
                        <a className="edit-post" onClick={() => props.postAPI.save({id: post.id, user: post.userId}, editId)}>Save</a>
                        -
                        <a className="edit-post" onClick={() => props.postAPI.cancel(post.id, editId)}>Cancel</a>
                    </span>
                )}
            </p>

        </li>)
    }

    return list;
}


export default class RestComponent extends Component {

    constructor(props){

        super(props);
        var vm =this;

        vm.state = { 
            isLoading: false, 
            editPost: null,
            userList: []
        };

        
        users.getUsers().then(
            res => {
                let users = [];
                res.forEach(user => {
                    users.push({
                        name: user.name,
                        value: user.id
                    })
                });
                vm.setState(()=>{return{userList: users}})
            }
        ) 

        
    }

    postList = [];

    
    render() {
        
        var vm = this;

        console.log('blog')
        console.log(vm.state);
        console.log('USERS NAMES: ', users.userName(1));


        function getPosts(params){
            vm.setState(() => {
                return {isLoading: true}
            });
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
                    console.log('Yuhu!', res);
                    vm.postList = res;
                    vm.setState(() => {
                        return {isLoading: false}
                    });
                },
                err => {
                    console.log('D\'oh!', err);
                    vm.setState(() => {
                        return {isLoading: false}
                    });                }
            );

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
                        if(element.id == post.id){

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
                err => {

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
            cancel: cancelPostEdit
        }

        function getPostsFiltered(){
            let selectedUserId = document.getElementById('post-user-id').value;
            console.log('Getting post from user #', selectedUserId);
            getPosts({userId: selectedUserId})
        }

        

        return <div id="Blog">
            
            <LoaderComponent loading={this.state.isLoading} />
            <h1>Bl-cmp</h1>
            <span>Filter by userID: </span>
            {/*<input type="text" id="post-user-id"></input>*/}
            <SelectComponent options={vm.state.userList} id={"post-user-id"} />
            <button onClick={()=>getPostsFiltered()}>GET POSTS</button>
            { vm.postList.length > 0 ? (
                <ul>
                    <ListPosts posts={vm.postList} postAPI={postAPI} state={this.state}/>                
                </ul>
            ):(
                <p>No posts found</p>
            )
            }
        </div>
    }

};