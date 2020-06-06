import React, { useState }  from 'react';
import { Comment, Avatar, Button, Input, Tooltip } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import moment from 'moment';
const { TextArea } = Input;



function SingleComment(props) {

    const [OpenReply, setOpenReply] = useState(false)


    const openReply = () =>{
        setOpenReply(!OpenReply)
    }


    const actions = [<span onClick={openReply} key="comment-basic-reply-to">답글쓰기</span>]
    

    return (
        <div>
            <Comment
                actions={actions}
                author={<a> { props.comment.cWriter } </a>}
                avatar={<Avatar shape="square" size="large" icon={<UserOutlined/>}  />}
                content={
                    <p>
                        { props.comment.pComment } 
                    </p>
                }

                datetime={
                    <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
                    <span>{moment().fromNow()}</span>
                    </Tooltip>
                }
            >
            </Comment>
            
            {/* 답글쓰기 */}

            {OpenReply &&
            <form style={{ display: 'flex' }}>
                <TextArea
                    style={{ width: '100%', borderRadius: '5px' }}
                    placeholder="누구누구님에게 답글 쓰기"
                />
                <br />
                <Button style={{ width: '20%', height: '52px' }} >등록</Button>
            </form>
        }


        </div>
    )
}

export default SingleComment
