import React, { useEffect, useState } from 'react';
import SingleComment from './SingleComment';

function ReplyComment(props) {



    let renderReplyComment = (parentCommentId) => 
        props.CommentLists.map((comment, index)=>(
            <React.Fragment>
                 
                {comment.responseto === parentCommentId &&
                    <div style={{ width: '80%', marginLeft: '40px' }}>
                        <SingleComment comment={comment}  parentCommentId={comment.cGroupSquence} refreshComment={props.refreshComment} deleteFuction = {props.deleteFuction} modifyFunction = {props.modifyFunction} />
                        <ReplyComment CommentLists={props.CommentLists} parentCommentId={comment.cGroupSquence}  refreshComment={props.refreshComment} deleteFuction = {props.deleteFuction} modifyFunction = {props.modifyFunction}/>
                    </div>
                }
            </React.Fragment>
        ))


    return (
        <div >
            {renderReplyComment(props.parentCommentId)}
        </div>
    )
}

export default ReplyComment
