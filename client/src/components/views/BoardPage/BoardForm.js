import React, { useEffect, useState } from 'react';
import { List, Avatar, Typography } from 'antd';
import { withRouter } from 'react-router-dom';
import { UserOutlined, CommentOutlined } from '@ant-design/icons';
import Comments from './Sections/Comments';
import { useDispatch } from 'react-redux';
import { requestBoardForm } from '../../../_actions/board_actions';
import { getComment } from '../../../_actions/comment_actions';
import FormDeleteAndModify from './Sections/FormDeleteAndModify';
import Favorites from './Sections/Favorites'

function BoardForm(props) {
    
    const { Title } = Typography;
    const dispatch = useDispatch(); 
    const [Content, setcontent] = useState([]);
    const [CommentLists, setCommentLists] = useState([]);
    const [date, setDate] = useState("");
    const [views, setViews] = useState(0);
    const [FavoriteCount, setFavoriteCount] = useState(0);
    const [CommentCnt, setCommentCnt] = useState(0);

    let body = {
        postNum : parseInt(props.match.params.postNum)
    }
    

    useEffect(() => {
            // 게시판 내용 요청
            dispatch(requestBoardForm(body))
            .then(response =>{
            if (response.payload.success){
                setcontent(response.payload.content[0].pContent);
                setDate(response.payload.content[0].date );
                setViews(response.payload.content[0].views + 1);
                setFavoriteCount(response.payload.content[0].favorite);
            } else {
                alert('게시판 내용을 가져오는데 실패했습니다.');
            }
        })

        // 코멘트 요청
        dispatch(getComment(body))
            .then(response =>{
            if (response.payload.success){
                setCommentLists(response.payload.comment);
                console.log("response.payload.comment.length", response.payload.comment.length)
                setCommentCnt(response.payload.comment.length);
            } else {
                alert('댓글을 가져오는데 실패했습니다.');
            }
        })


    },[])


    const updateComment = (newComment) => {
        setCommentCnt(CommentCnt + 1)
        setCommentLists(CommentLists.concat(newComment))    
        
    }
    
    const deleteComment = (cGroupSquence) => {
        setCommentLists(CommentLists.map(item => item.cGroupSquence === cGroupSquence 
            ? ({...item, pComment: null}) : item
            ))  
    }

    const modifyComment = (pComment, cGroupSquence) => {
        
        setCommentLists(CommentLists.map(item => item.cGroupSquence === cGroupSquence 
            ? ({...item, pComment: pComment}) : item
            ))  
    }
    

    // const boardcontent = Content.map((contents, index) => {

    //     console.log("contents.pContent", contents.title)
    //     let data = contents.pContent
        
    //     // https://velopert.com/1896 참고함.
    //     return <div>
    //             {
    //                 data.split('\n').map( line => {
    //                     return (<span>{line}<br/></span>)
    //                 })
    //             }
    //            </div>
    // })


    return (
        <div style={{
            maxWidth: '700px', margin: '2rem auto'
        }}>
            <div style={{ textAlign: 'left', marginBottom: '2rem' }}>
            <Title level={2}> { props.location.state[0] } </Title>
            </div>

            {/*글번호, 제목, 글내용*/}
            <FormDeleteAndModify num={props.match.params.postNum} title={props.location.state[0]} content={Content} />

            {/* 이미지,아이디,날짜,조회수 */}
             <List.Item>
                <List.Item.Meta 
                    avatar={<Avatar shape="square" size="large" icon={<UserOutlined/>}  />}
                    title={ props.location.state[1] }
                    description={ date + " 조회 " + views }
                />
             </List.Item>
            <hr />


            <div>
                {/* 글쓰여진 부분 */}
                {Content}
            </div>

            {/* 좋아요 */}                          
            {localStorage.getItem('userId') ?  <Favorites favoriteData={ body } CommentCnt={CommentCnt} favorite={FavoriteCount} > </Favorites> 
                                            :  <p> <CommentOutlined /> 댓글 {CommentCnt} </p> }
            
            {/* 코멘트 */} 
            <div>
                <Comments CommentLists={CommentLists} refreshComment={updateComment} deleteFuction = {deleteComment} modifyFunction = {modifyComment} >  </Comments>
            </div>

        </div>
    )
}

export default withRouter(BoardForm)
