import React, { useState }  from 'react';
import { Comment, Avatar, Button, Input, Popconfirm, message } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import moment from 'moment';
import axios from 'axios';
import Report from './Report';
import { useSelector } from 'react-redux';

const { TextArea } = Input;



function SingleComment(props) {
    const BASE_URL = "http://localhost:5000";

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

        const cNum = props.comment._id;
        // 댓글 삭제
        //삭제할 시퀀스 넘버 보내기
        axios.delete(`/api/comment/1/${cNum}`)
            .then(response => {
                if(response.data.success){
                    alert('댓글이 삭제되었습니다')
                    //삭제 된 댓글 리플래쉬
                    props.deleteFuction(props.comment._id)

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
            cGroupSquence : props.comment._id,
            pComment: ModifyComment,
        };

        // 댓글 수정
        axios.post('/api/comment/change', body)
            .then(response => {
                if(response.data.success){
                    
                    props.modifyFunction(ModifyComment, props.comment._id)
                    setModifyComment(""); // 코멘트 초기화

                    // 수정한 코멘트 리플래쉬
                    setModify(!Modify);

                } else {
                    alert('댓글 수정에 실패 하셨습니다');
                }
            })
            
    }

    const actions = (localStorage.getItem('userId') === props.comment.cWriter.id ? [<span onClick={openReply} key="comment-basic-reply-to">답글쓰기</span>,

            <span onClick={openModify}> 수정</span>,

            <Popconfirm title="댓글을 삭제하시겠습니까?"
                onConfirm={confirm}
                onCancel={cancel}
                okText="Yes"
                cancelText="No">삭제</Popconfirm>
                
            ] : localStorage.getItem('userId') &&
            
            [<span onClick={openReply} key="comment-basic-reply-to">답글쓰기</span>, 
            <span> <Report comment={true} pComment={props.comment.pComment} cGroupSquence={props.comment._id} toId={props.comment.cWriter._id} ></Report> </span> ]

        )


        // 댓글 저장
        const onSubmit = (event) =>{
                        
            event.preventDefault();     
            let body = {
                pNum: board.boardContent.postnum, // 글써져있는곳
                cWriter: user.userData.id, //작성자
                pComment: replyComment, // 내용
                gNum: props.comment._id, // 부모 번호
                gDepth: props.comment.gDepth + 1, // 루트                
                date: moment().format('YYYY-MM-DD HH:mm:ss'),
                cID: props.comment.cWriter.id,
                commentPage : props.commentPage
            }
            
            // 자식 댓글 저장
            axios.post('/api/comment/child', body)
                .then(response => {
                    if(response.data.success){
                        setReplyComment("") // 코멘트 초기화
                        body.cGroupSquence = response.data.cGroupSquence
                        props.refreshComment(response.data.comment)// 코멘트 리프래쉬

                        setOpenReply(!OpenReply)
                    } else {
                        alert('댓글 저장에 실패 하셨습니다')
                    }
    
    
                })
    
        }

    if (!Modify){

        return (
 
            <div style={{ width: props.comment.gDepth >= 1 ? '80%' : '' , marginLeft: props.comment.gDepth >= 1 ? '40px' : '' }}>

                {/* content가 null일 경우 삭제된 댓글 */}
                
                    { props.comment.pComment ? <Comment
                        actions={actions}
                        author={<a> { props.comment.cWriter.id } </a>}
                        avatar={<Avatar shape="square" size="large" src = {`${BASE_URL}/img/${props.comment.cWriter.avatar}`} icon={ props.comment.avatar == null && <UserOutlined/>} /> }
                        content={
                            <span>
                                { props.comment.gDepth >= 2 &&
                                    <span style={{fontWeight:'600' }}> 
                                        {props.comment.cWriter.id } &nbsp;&nbsp;  
                                    </span>
                                }       
                                { props.comment.pComment } 
                            </span>
                        }
        
                        datetime={
                            <span>{props.comment.date}</span>
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
                                placeholder= {props.comment.cWriter.id + "님에게 답글 쓰기"}
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
