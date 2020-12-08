import React, { useEffect, useState } from 'react';
import { List, Avatar, Typography, Pagination } from 'antd';
import { withRouter } from 'react-router-dom';
import { UserOutlined, CommentOutlined } from '@ant-design/icons';
import Comments from './Sections/Comments';
import { useDispatch } from 'react-redux';
import { requestBoardForm } from '../../../_actions/board_actions';
import { getComment, getLatestComment } from '../../../_actions/comment_actions';
import FormDeleteAndModify from './Sections/FormDeleteAndModify';
import Favorites from './Sections/Favorites';
import queryStirng from 'query-string';


function BoardForm(props) { //title, writer, views, favorite, 보드 페이지 번호 and 목록버튼 만들기!!!

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

    const [CurrentPage,setCurrentPage] = useState(getCommentPage());


    const body = {
        postNum : parseInt(props.match.params.postNum)
    };
    
    const requestComment = (commentBody) => {
        
        if (RegisterComment){
               dispatch(getComment(commentBody))
               .then(response =>{
               if (response.payload.success){
                   console.log("response.payload.comment",response.payload.comment)

                   setCommentLists(response.payload.comment);
                   setCommentCnt(response.payload.commentCnt);
               } else {
                   alert('댓글을 가져오는데 실패했습니다.');
               }
           })
       } else {
           dispatch(getLatestComment(commentBody))
           .then(response =>{
               if (response.payload.success){
                   setCommentLists(response.payload.comment);
                   setCommentCnt(response.payload.commentCnt);
                   console.log("모지",response.payload.comment)
                   
               } else {
                   alert('댓글을 가져오는데 실패했습니다.');
               }
           })
       }
    }


    useEffect(() => {

        dispatch(requestBoardForm(parseInt(props.match.params.postNum)))
            .then(response =>{
            if (response.payload.success){
                console.log("response.payload.content", response.payload.content)
                setcontent(response.payload.content.content);
                setPtitle(response.payload.content.title )
                setWriter(response.payload.content.writer)
                setDate(response.payload.content.date );
                setViews(response.payload.content.views + 1);
                setFavoriteCount(response.payload.content.favorite);
                setImage(response.payload.content.avatar);
            } else {
                alert('게시판 내용을 가져오는데 실패했습니다.');
            }
        })

    },[])

    useEffect(() => {

        const commentBody = {
            postNum : parseInt(props.match.params.postNum),
            commentPage : getCommentPage()
        };

        requestComment(commentBody);
        
        setCurrentPage(getCommentPage());

    },[getCommentPage()])

    const updateComment = (newComment) => {
        setCommentCnt(CommentCnt + 1);
        setCommentLists(newComment);
        
    }
    
    const deleteComment = (cGroupSquence) => {
        setCommentLists(CommentLists.map(item => item._id === cGroupSquence 
            ? ({...item, pComment: null}) : item
            ))  
    }

    const modifyComment = (pComment, cGroupSquence) => {
        setCommentLists(CommentLists.map(item => item._id === cGroupSquence 
            ? ({...item, pComment: pComment}) : item
            ))  
            // type="primary" 
            // htmlType="submit">
    }

    const commentPageSelect = (commentPage) => {

        const commentBody = {
            postNum : parseInt(props.match.params.postNum),
            commentPage : commentPage
        };

        requestComment(commentBody);

        props.history.push(`${body.postNum}?comment_page=${commentPage}`);

        setCurrentPage(commentPage);

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
                    setCommentCnt(response.payload.commentCnt);

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

            
            console.log("최신순");
            setRegisterComment(false);
            setrLatestComment(true);

            dispatch(getLatestComment(commentBody))
            .then(response =>{
                if (response.payload.success){
                    setCommentLists(response.payload.comment);
                    setCommentCnt(response.payload.commentCnt);

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
                    style={{ marginLeft: localStorage.getItem('userId') === Writer ? '40rem' : '40rem'}}/*32*/
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
                    current={CurrentPage}
                    total={CommentCnt}
                    onChange = {commentPageSelect}
                />
            </div>

        </div>
    )
}

export default withRouter(BoardForm)
