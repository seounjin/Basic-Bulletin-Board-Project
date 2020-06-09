import React, { useState }  from 'react';
import { Comment, Avatar, Button, Input, Tooltip } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import moment from 'moment';
import axios from 'axios';
import { useSelector } from 'react-redux';

const { TextArea } = Input;



function SingleComment(props) {

    const [OpenReply, setOpenReply] = useState(false)
    const [replyComment, setReplyComment] = useState("")
    const [Delete, setDelete] = useState(false)

    const openReply = () =>{
        setOpenReply(!OpenReply)
    }

    const handleChange = (event) => { // 타이핑 되게!!
        setReplyComment(event.currentTarget.value)
    }

    const board = useSelector(state => state.board) 
    const user = useSelector(state => state.user) 
    
    const actions = [<span onClick={openReply} key="comment-basic-reply-to">답글쓰기</span>,
                    <span> 수정</span>,
                    <span> 삭제</span>
                    ]
            
    
        // 댓글 저장
        const onSubmit = (event) =>{
            event.preventDefault();     
            
            let body = {
                pNum: board.boardContent.postnum, // 글써져있는곳
                cWriter: user.userData.id, //작성자
                pComment: replyComment, // 내용
                responseto: props.parentCommentId, // 부모 번호
                date: moment().format('YYYY-MM-DD HH:mm:ss')
            }
    
            axios.post('/api/comment/saveComment', body)
                .then(response => {
                    if(response.data.success){
                        setReplyComment("") // 코멘트 초기화

                        body.cGroupSquence = response.data.cGroupSquence
                        console.log("바아디", body)
                        props.refreshComment(body)// 코멘트 리프래쉬
                        setOpenReply(!OpenReply)
                    } else {
                        alert('댓글 저장에 실패 하셨습니다')
                    }
    
    
                })
    
        }


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
                        onChange={handleChange}
                        value={replyComment}
                        placeholder="누구누구님에게 답글 쓰기"
                    />
                    <br />
                    <Button style={{ width: '20%', height: '52px' }} onClick={onSubmit}>등록</Button>
                </form>
            }


        </div>
    )
}

export default SingleComment
