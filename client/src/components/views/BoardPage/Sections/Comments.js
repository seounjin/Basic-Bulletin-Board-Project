import React, { useState } from 'react';
import { Button, Input } from 'antd';
import SingleComment from './SingleComment';


function Comments(props) {

    const { TextArea } = Input;
    const [Comment, setComment] = useState("")


    // 댓글 저장
    const onSubmit = (event) =>{
        event.preventDefault();
    }


    return (
        <div>

            {props.CommentLists && props.CommentLists.map((comment,index)=>(
                // responseTo만 없는 애들만 출력
                (!comment.responseTo &&  
                    <React.Fragment>
                        <SingleComment comment={comment}/>
                    </React.Fragment>
                )

            ))}
            

            {/* 코멘트 쓰는곳  */}
            <form style={{ display: 'flex' }}>
                    <TextArea
                        style={{ width: '100%', borderRadius: '5px' }}
                        placeholder="댓글을 남겨 보세요"
                    />
                    <br />
                    <Button style={{ width: '20%', height: '52px' }} onClick={onSubmit}>등록</Button>
            </form>
        </div>
    )
}

export default Comments
