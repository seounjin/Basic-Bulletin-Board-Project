import React, { useEffect, useState } from 'react';
import { List, Avatar, Typography, Pagination, Button } from 'antd';
import { withRouter, Link } from 'react-router-dom';
import { UserOutlined, CommentOutlined } from '@ant-design/icons';
import Comments from './Sections/Comments';
import { useDispatch, useSelector } from 'react-redux';
import { requestBoardForm } from '../../../_actions/board_actions';
import { getComment, getLatestComment } from '../../../_actions/comment_actions';
import FormDeleteAndModify from './Sections/FormDeleteAndModify';
import Favorites from './Sections/Favorites';
import queryStirng from 'query-string';


function BoardForm(props) { //title, writer, views, favorite, 보드 페이지 번호 and 목록버튼 만들기!!!
    
    //console.log("props location", props.location.state[0])
    console.log("props history", props.location.history)
    const BASE_URL = "http://localhost:5000";

    const { Title, Text } = Typography;
    const dispatch = useDispatch(); 
    const [Ptitle, setPtitle] = useState("");
    const [Writer, setWriter] = useState("");
    const [Content, setcontent] = useState("");
    const [CommentLists, setCommentLists] = useState([]);
    const [date, setDate] = useState("");
    const [views, setViews] = useState(0);
    const [FavoriteCount, setFavoriteCount] = useState(0);
    const [CommentCnt, setCommentCnt] = useState(0);
    const [Image, setImage] = useState("");

    const [LatestComment, setrLatestComment] = useState(false);
    const [RegisterComment, setRegisterComment] = useState(true);


    const getCommentPage = () => {

        const { search } = props.location;
        const queryObj = queryStirng.parse(search);
        const { comment_page } = queryObj;
        if (comment_page) {
            return parseInt(comment_page)
        } else{
            return 1
        }

    }
    const board = useSelector(state => state.board);

    const body = {
        postNum : parseInt(props.match.params.postNum)
    }
    
   
    useEffect(() => {

            const commentBody = {
                postNum : parseInt(props.match.params.postNum),
                commentPage : getCommentPage()
            }

            console.log("보드",board)

            // 게시판 내용 요청
            dispatch(requestBoardForm(body))
            .then(response =>{
            if (response.payload.success){
                console.log("response.payload.content", response.payload.content)
                setcontent(response.payload.content[0].pContent);
                setPtitle(response.payload.content[0].title )
                setWriter(response.payload.content[0].writer)
                setDate(response.payload.content[0].date );
                setViews(response.payload.content[0].views + 1);
                setFavoriteCount(response.payload.content[0].favorite);
                setImage(response.payload.content[0].avatar);
            } else {
                alert('게시판 내용을 가져오는데 실패했습니다.');
            }
        })
        
        // 코멘트 요청
        dispatch(getComment(commentBody))
            .then(response =>{
            if (response.payload.success){
                setCommentLists(response.payload.comment);
                setCommentCnt(response.payload.commentCnt.totalComment);
                
            } else {
                alert('댓글을 가져오는데 실패했습니다.');
            }
        })


    },[getCommentPage()])


    const updateComment = (newComment) => {
        setCommentCnt(CommentCnt + 1);
        setCommentLists(newComment);
        
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
            // type="primary" 
            // htmlType="submit">
    }

    const commentPageSelect = (commentPage) => {


        const commentBody = {
            postNum : parseInt(props.match.params.postNum),
            commentPage : getCommentPage()
        }

        if (RegisterComment){
             // 코멘트 요청
                dispatch(getComment(commentBody))
                .then(response =>{
                if (response.payload.success){
                    setCommentLists(response.payload.comment);
                    setCommentCnt(response.payload.commentCnt.totalComment);
                    props.history.push(`${body.postNum}?comment_page=${commentPage}`);
                } else {
                    alert('댓글을 가져오는데 실패했습니다.');
                }
            })
        } else {
            dispatch(getLatestComment(commentBody))
            .then(response =>{
                if (response.payload.success){
                    setCommentLists(response.payload.comment);
                    setCommentCnt(response.payload.commentCnt.totalComment);

                } else {
                    alert('댓글을 가져오는데 실패했습니다.');
                }
            })

        }
       

    }   

    const registerComment = (event) =>{
            event.preventDefault();
            console.log("등록순");
            setRegisterComment(true);
            setrLatestComment(false);

            const commentBody = {
                postNum : parseInt(props.match.params.postNum),
                commentPage : getCommentPage()
            }

            dispatch(getComment(commentBody))
            .then(response =>{
            if (response.payload.success){
                setCommentLists(response.payload.comment);
                setCommentCnt(response.payload.commentCnt.totalComment);
                        } else {
                alert('댓글을 가져오는데 실패했습니다.');
            }

    })
        }
        
    const latestComment = (event) =>{
            event.preventDefault();

            const commentBody = {
                postNum : parseInt(props.match.params.postNum),
                commentPage : getCommentPage()
            }

            
            console.log("최신순")
            setRegisterComment(false);
            setrLatestComment(true);

            dispatch(getLatestComment(commentBody))
            .then(response =>{
                if (response.payload.success){
                    setCommentLists(response.payload.comment);
                    setCommentCnt(response.payload.commentCnt.totalComment);

                } else {
                    alert('댓글을 가져오는데 실패했습니다.');
                }
            })


        }

    return (
        <div style={{
            maxWidth: '700px', margin: '2rem auto',
        }}>
            <div style={{ textAlign: 'left', marginBottom: '2rem' }}>
            <Title level={2}> { Ptitle } </Title>
            </div>

            <form style={{ display: 'flex'}}>
                {localStorage.getItem('userId') === Writer && <FormDeleteAndModify
                    style={{width: '100%'}}
                    num={props.match.params.postNum}    
                    title={Ptitle} 
                    content={Content} 
                />}

                <div
                    style={{ marginLeft: localStorage.getItem('userId') === Writer ? '40rem' : '40rem'}}
                >
                    {/* <Button>
                        <Link to={{
                                pathname : window.sessionStorage.currentDoc+`${props.location.state[0]}`
                        }}>목 록</Link>
                    </Button> */}
                </div>
            </form>

            {/* 이미지,아이디,날짜,조회수 */}
             <List.Item>
                <List.Item.Meta 
                    avatar={<Avatar shape="square" size="large" src = {`${BASE_URL}/img/${Image}`} icon={ Image == null && <UserOutlined/>}   />}
                    title={ Writer }
                    description={ date + " 조회 " + views }
                />
             </List.Item>

            <hr />
            <br/>
            <div>
                {
                    Content.split('\n').map( line => {
                        return (<span>{line}<br/></span>)
                    })
                }
            </div>
            <br/><br/>
            
            
            {/* 좋아요 */}                          
            {localStorage.getItem('userId') ? <Favorites favoriteData={ body } CommentCnt={CommentCnt} favorite={FavoriteCount} writer={Writer}> </Favorites>  
                                                
                                            :  <p> <CommentOutlined /> 댓글 {CommentCnt} </p> }
            
            {/* {Writer && localStorage.getItem('userId') !== Writer && "ㅎㅎㅎ"} */}

            <hr />

            {/* 등록순 최신순 */}
            <div>
                {RegisterComment ? <a><Text strong onClick={registerComment}> 등록순 </Text></a> : <a><Text type="secondary" onClick={registerComment}> 등록순 </Text></a>}
                {LatestComment ? <a><Text strong onClick={latestComment}> 최신순 </Text></a> : <a><Text type="secondary" onClick={latestComment}> 최신순 </Text></a>}
            </div>

            <br/>

            {/* 코멘트 */} 
            <div>
                <Comments CommentLists={CommentLists} refreshComment={updateComment} deleteFuction = {deleteComment} modifyFunction = {modifyComment} commentPage ={getCommentPage()}>  </Comments>
            </div>

            {/* Pagination */}
            <div style={{ textAlign: 'center' , marginTop: '2rem' }}>
                <Pagination
                    current={getCommentPage()}
                    total={CommentCnt}
                    onChange = {commentPageSelect}
                />
            </div>

        </div>
    )
}

export default withRouter(BoardForm)
