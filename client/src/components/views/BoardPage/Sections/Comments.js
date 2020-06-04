import React from 'react';
import { Button, Input } from 'antd';
import SingleComment from './SingleComment';


function Comments() {

    const { TextArea } = Input;

    const onSubmit = (event) =>{
        event.preventDefault();
    }


    return (
        <div>
            
            <SingleComment></SingleComment>            


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
