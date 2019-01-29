import React from 'react';

function listPostsComponent(props){

    let list = [];

    var user = props.user

    //for (const post of props.posts) {
    for(let index = props.posts.length -1; index >= 0; index--){

        let post = props.posts[index];
        //console.log(post)
        let editId = {
            title:  'title-edit-' + post._id,
            body:   'body-edit-' + post._id
        }
        list.push(<li key={post._id}>
            
            {props.state.editPost === post._id ? editablePostFieldsTpl(editId, post) : fixedPostFieldsTpl(post)}
            
            {(post.userId === user._id) ? (
                <div className="post-footer">
                    {props.state.editPost !== post._id ? editDeleteFooterTpl(props, post, editId, index) : saveCancelFooterTpl(props, post, editId) }
                </div>
            ) : ( 
                <div className="post-footer">
                    <strong>Author: </strong> { post.user }
                </div>
            ) }

        </li>)
    }

    return list;

}

function saveCancelFooterTpl(props, post, editId) {
    return <div className="btn-group">
        <button className="edit-post btn btn-success" onClick={() => props.postAPI.save({ id: post._id, userId: post.userId }, editId)}> Save </button>
        <button className="edit-post btn btn-secondary" onClick={() => props.postAPI.cancelEdit(post._id, editId)}> Cancel </button>
    </div>;
}

function editDeleteFooterTpl(props, post, editId, index) {
    return <div className="btn-group">
        <button className="edit-post btn btn-ligth" onClick={() => props.postAPI.edit(post._id, editId)}>Edit</button>
        <button className="edit-post btn btn-info" onClick={() => props.postAPI.deleteModal({ id: post._id, index: index })}>Delete</button>
    </div>;
}

function fixedPostFieldsTpl(post) {
    return <div className="post">
        <h4>{post.title}</h4>
        <p>{post.body}</p>
    </div>;
}

function editablePostFieldsTpl(editId, post) {
    return <div className="post">
        <input className="title-edit" id={editId.title} defaultValue={post.title} placeholder="Title"></input>
        <textarea className="body-edit" id={editId.body} defaultValue={post.body} placeholder="Message"></textarea>
    </div>;
}

export default listPostsComponent;