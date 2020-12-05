import React, { useState } from 'react';
import { Button, Input } from 'antd';
import SingleComment from './SingleComment';
import { useSelector } from 'react-redux';
import axios from 'axios';

import moment from 'moment';

function Comments(props) {

    const { TextArea } = Input;
    const [Comment, setComment] = useState("")

    const board = useSelector(state => state.board) 
    const user = useSelector(state => state.user) 

    const handleChange = (event) => { // 타이핑 되게!!
        setComment(event.currentTarget.value)
    }

    // 댓글 저장
    const onSubmit = (event) =>{
        event.preventDefault();     
        
        let body = {
            pNum: board.boardContent.postnum, // 글써져있는곳
            cWriter: user.userData.id, //작성자
            pComment: Comment, // 내용
            gDepth: 0, // 루트
            date: moment().format('YYYY-MM-DD HH:mm:ss'),
            commentPage: props.commentPage
        }

        // 부모 댓글 저장
        axios.post('/api/comment/parent', body)
            .then(response => {
                console.log("response.data",response.data);
                if(response.data.success){
                    setComment("") // 코멘트 초기화

                    body.cGroupSquence = response.data.cGroupSquence
                    props.refreshComment(response.data.comment)// 코멘트 리프래쉬
                } else {
                    console.log("실패")
                    alert('댓글 저장에 실패 하셨습니다')
                }


            })
    }

    return (

        <div>

            {props.CommentLists && props.CommentLists.map((comment,index)=>(
                
                <SingleComment comment={comment} parentCommentId={comment.cGroupSquence } refreshComment={props.refreshComment}  
                                                 deleteFuction = {props.deleteFuction} modifyFunction = {props.modifyFunction}
                                                 commentPage={props.commentPage}
                                                 />

            ))}
            
            {localStorage.getItem('userId') &&
                <form style={{ display: 'flex'}}>
                        <TextArea
                            style={{ width: '100%', borderRadius: '5px' }}
                            onChange={handleChange}
                            value={Comment}
                            placeholder="댓글을 남겨 보세요"
                        />
                        <br />
                        <Button style={{ width: '20%', height: '52px' }} onClick={onSubmit}>등록</Button>
                </form>
            }

        </div>

    )

}

export default Comments
