import React from 'react';

function PostCreator(props){

    console.log('TEST',props)

    return <div id="new-post" className="posts-list">
        <h4>Create Post</h4>
        <input className="title-edit" id="new-post-title" placeholder="Title"></input>
        <textarea className="body-edit" id="new-post-body" placeholder="Message"></textarea>
        <div className="post-footer">
            <strong>Author: </strong> {props.user.name}
            <div className="btn-group">
                <button className="btn btn-success" onClick={() => props.postAPI.create() }> Post </button>
                <button className="btn btn-secondary" onClick={() =>  props.closePostCreator()}> Cancel </button>
            </div>
        </div>
    </div>
}

export default PostCreator