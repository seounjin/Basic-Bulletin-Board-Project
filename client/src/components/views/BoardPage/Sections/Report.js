import React, { useState } from 'react'
import { Typography, Modal, Input } from 'antd';
import { useSelector } from 'react-redux';
import moment from 'moment';
import axios from 'axios';

function Report(props) {

    const { Text } = Typography;
    const { TextArea } = Input;
    const [ModalState, setModalState] = useState(false);
    const [ModalContent, setModalContent] = useState("");
   
    const board = useSelector(state => state.board);
    const user = useSelector(state => state.user); 

    const reportClick = (event)=>{
        setModalState(true);
    }

    const handleOk = (event) => {
        setModalState(false);

        // 댓글일 경우  글번호, 신고한 아이디,신고당한 아이디, 신고 date, 댓글 고유번호
        // 글번호, 신고사유, 신고한 아이디,신고당한 아이디, 신고 date
        
        if (props.comment){ 
            console.log("확확인인", props.cGroupSquence);
            
            const body = {
                pNum: board.boardContent.postnum,
                rContent: ModalContent,
                content: props.pComment,
                cGroupSquence: props.cGroupSquence,
                fromId: user.userData.id,
                toId: props.toId,
                date: moment().format('YYYY-MM-DD HH:mm:ss'),
            }
            
            // 댓글 신고
            axios.post('/api/report/comment', body)
            .then(response => {
                if(response.data.success){
                    if(response.data.report){
                        alert('이미 신고된 댓글입니다.');

                    } else{
                        alert('신고 완료.')
                    }
                    
                } else {
                    alert('신고에 실패 하였습니다.');
                }
            })


        } else {
            const body = {
                pNum: board.boardContent.postnum,
                rContent: ModalContent,
                fromId: user.userData.id,
                toId: board.boardContent.content._id,
                date: moment().format('YYYY-MM-DD HH:mm:ss'),
                content: board.boardContent.content.content
            }
            
            // 게시글 신고
            axios.post('/api/report/post', body)
            .then(response => {
                if(response.data.success){
                    if(response.data.report){
                        alert('이미 신고된 게시판입니다.')

                    } else{
                        alert('신고 완료.')
                    }
                    
                } else {
                    alert('신고에 실패 하였습니다.')
                }
            })
        }
        
    };

    const handleCancel = (event) => {
        setModalState(false)
    };
      
    const handleChange = (event) => {
        setModalContent(event.currentTarget.value)
    };

    
    //board.boardContent && localStorage.getItem('userId') !== board.boardContent.content[0].writer
    // 댓글이라면 스타일 글자 변환
    
    return (
        <React.Fragment>
            { props.comment ? <a style={{ fontSize: '12px' }} onClick={reportClick} ><Text type="secondary"> 신고 </Text></a> :
            
             <a style={{ marginLeft: '32rem'}}onClick={reportClick} ><Text strong> 신고 </Text></a> }
            
            <Modal
                title="신고 사유"
                visible={ModalState}
                onOk={handleOk}
                onCancel={handleCancel}
            >

                <TextArea
                    rows={4}
                    onChange={handleChange}
                    maxLength={30}
                    />
            </Modal>

        </React.Fragment>
    )
    
}

export default Report
