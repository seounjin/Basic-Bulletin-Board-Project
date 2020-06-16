import React, { useState, useEffect }  from 'react';
import { Comment, Avatar, Button, Input, Tooltip, Popconfirm, message } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import moment from 'moment';
import axios from 'axios';
import { useSelector } from 'react-redux';

const { TextArea } = Input;



function SingleComment(props) {

    const [OpenReply, setOpenReply] = useState(false)
    const [replyComment, setReplyComment] = useState("")
    const [Modify, setModify] = useState(false)
    const [ModifyComment, setModifyComment] = useState("")

    const board = useSelector(state => state.board) 
    const user = useSelector(state => state.user) 

    const openReply = () =>{
        setOpenReply(!OpenReply)
    }

    const handleChange = (event) => { // 타이핑 되게!!
        setReplyComment(event.currentTarget.value)
    }

    const modifyHandleChange = (event) => { // 타이핑 되게!!
        setModifyComment(event.currentTarget.value)
    }


    const confirm = (event) => { // 댓글 삭제 버튼
        message.success('Click on Yes');

        const body = { cGroupSquence : props.comment.cGroupSquence }

        //삭제할 시퀀스 넘버 보내기
        axios.post('/api/comment/deleteComment', body)
            .then(response => {
                if(response.data.success){
                    alert('댓글이 삭제되었습니다')
                    //삭제 된 댓글 리플래쉬
                    props.deleteFuction(body.cGroupSquence)

                } else {
                    alert('댓글 삭제에 실패 하셨습니다')
                }
            })

    }
      
    const cancel = (event)=> { //댓글 삭제 버튼 취소
        console.log(event);
        message.error('Click on No');
    }


    const openModify = () => {
        setModify(!Modify);
    }

    const cancelModify = () => {
        setModify(!Modify);
    }
    
    // 댓글 수정
    const requestModify =(event) => {
        event.preventDefault();
        
        // 시퀀스 넘버와, 수정된 내용
        let body = {
            cGroupSquence : props.comment.cGroupSquence,
            pComment: ModifyComment,
        };

        axios.post('/api/comment/modifyComment', body)
            .then(response => {
                if(response.data.success){
                    
                    props.modifyFunction(ModifyComment, props.comment.cGroupSquence)
                    setModifyComment(""); // 코멘트 초기화

                    // 수정한 코멘트 리플래쉬
                    setModify(!Modify);

                } else {
                    alert('댓글 수정에 실패 하셨습니다');
                }
            })
            
    }

    const actions = (localStorage.getItem('userId') === props.comment.cWriter ? [<span onClick={openReply} key="comment-basic-reply-to">답글쓰기</span>,

            <span onClick={openModify}> 수정</span>,

            <Popconfirm title="댓글을 삭제하시겠습니까?"
                onConfirm={confirm}
                onCancel={cancel}
                okText="Yes"
                cancelText="No">삭제</Popconfirm>
            ] : [<span onClick={openReply} key="comment-basic-reply-to">답글쓰기</span>]

        )


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
                        props.refreshComment(body)// 코멘트 리프래쉬

                        setOpenReply(!OpenReply)
                    } else {
                        alert('댓글 저장에 실패 하셨습니다')
                    }
    
    
                })
    
        }

    if (!Modify){

        return (

            <div>
                {/* content가 null일 경우 삭제된 댓글 */}
    
                { props.comment.pComment ? <Comment
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
                </Comment> : <Comment
                                content={
                                    <p>
                                    삭제된 댓글 입니다.
                                    </p>
                                }
                
                            ></Comment> }
                
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
    } else {

        return(
            <div>
                <form style={{ display: 'flex' }}>
                    <TextArea
                        style={{ width: '100%', borderRadius: '5px' }}
                        onChange={ modifyHandleChange } 
                        defaultValue = { `${props.comment.pComment}` + ModifyComment }
                    />
                    <br />
                    <Button style={{ width: '20%', height: '52px' }} onClick={requestModify} > 등록 </Button>
                    <Button style={{ width: '20%', height: '52px' }} onClick={cancelModify} > 취소 </Button>
                </form>
            </div>
        )        

    }
    
}

export default SingleComment
