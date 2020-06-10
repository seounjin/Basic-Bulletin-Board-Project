import React, { useEffect, useState } from 'react';
import { List, Avatar, Typography } from 'antd';
import { withRouter } from 'react-router-dom';
import { UserOutlined } from '@ant-design/icons';
import Comments from './Sections/Comments';
import { useDispatch } from 'react-redux';
import { requestBoardForm } from '../../../_actions/board_actions';
import { getComment } from '../../../_actions/comment_actions';


function BoardForm(props) {
    
    const { Title } = Typography;
    const dispatch = useDispatch(); 
    const [Content, setcontent] = useState([]);
    const [CommentLists, setCommentLists] = useState([])

    let body = {
        postNum : parseInt(props.match.params.postNum)
    }


    useEffect(()=>{

        // props.location ==> Array[0 ~ 3] ==> 0:title, 1: writer, 2: views, 3: favorite
        dispatch(requestBoardForm(body))
            .then(response =>{
            if (response.payload.success){
                setcontent(response.payload.content);
            } else {
                alert('게시판 내용을 가져오는데 실패했습니다.')
            }
        })
        
        // 코멘트 요청
        dispatch(getComment(body))
            .then(response =>{
            if (response.payload.success){
                setCommentLists(response.payload.comment);
            } else {
                alert('게시판 내용을 가져오는데 실패했습니다.')
            }
        })


    },[])

    const updateComment = (newComment) => {

        setCommentLists(CommentLists.concat(newComment))
    }

    const boardcontent = Content.map((contents, index) => {

        console.log("contents.pContent", contents.title)
        let data = contents.pContent
        
        // https://velopert.com/1896 참고함.
        return <div>
                {
                    data.split('\n').map( line => {
                        return (<span>{line}<br/></span>)
                    })
                }
               </div>

    })

    return (
        <div style={{
            maxWidth: '700px', margin: '2rem auto'
        }}>
            <div style={{ textAlign: 'left', marginBottom: '2rem' }}>
            <Title level={2}> 게시판 제목 </Title>
            </div>
            
            {/* 이미지,아이디,날짜,조회수 */}
             <List.Item>
                <List.Item.Meta 
                    avatar={<Avatar shape="square" size="large" icon={<UserOutlined/>}  />}
                    title={ props.location.state.writer }
                    description={ "날짜 , 조회수" }
                />
             </List.Item>
            <hr />


            <div>
                {/* 글쓰여진 부분 */}
                {boardcontent}
            </div>

            {/* 코멘트 */}
            <div>
                <br />
                <p> (게시글좋아요), 댓글 수, </p>
                <hr />

                <Comments CommentLists={CommentLists} refreshComment={updateComment}> </Comments>
            </div>

        </div>
    )
}

export default withRouter(BoardForm)
