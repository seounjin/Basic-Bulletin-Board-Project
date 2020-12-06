import React, { useEffect, useState } from 'react';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import { Tooltip, Typography } from 'antd';
import { CommentOutlined } from '@ant-design/icons';
import Report from './Report';
import axios from 'axios';


function Favorites(props) {

    const [Favorite,setFavorite] = useState(false);
    const [FavoriteCount, setFavoriteCount] = useState(0);

    const { Text } = Typography;

    const favoriteClick = () => {
        // 게시판 번호, 접속중인 아이디
        const body = {
            postNum : props.favoriteData.postNum, 
            userId : localStorage.getItem('userId')
        }

        // 좋아요 안누른 상태
        if(!Favorite){
            
            //좋아요 요청
            console.log("favorite, favorite\n")
            axios.post('/api/board/favorite', body)
            .then(response => {
                if(response.data.success){
                    setFavorite(true)
                    setFavoriteCount(FavoriteCount + 1)
                } else {
                    alert('좋아요 클릭이 실패 하였습니다.')
                }
            })

        }else{ //좋아요 버튼을 누른 상태

            //좋아요 취소 요청
            axios.post('/api/board/unfavorite', body)
            .then(response => {
                if(response.data.success){
                    setFavorite(false)
                    setFavoriteCount(FavoriteCount-1)
                } else {
                    alert('좋아요 클릭이 실패 하였습니다.')
                }
            })
        }
    }

    useEffect(() => {
        
        // 게시판 번호, 접속중인 아이디
        const body = {
            postNum : props.favoriteData.postNum, 
            userId : localStorage.getItem('userId')
        }

        //해당 사용자가 좋아요 버튼을 눌렀는지 안눌렀는지 확인하기위해 좋아요 정보를 가져 옴
        axios.post('/api/board/favorite/check', body)
            .then(response => {
                if(response.data.success){
                    
                    if(response.data.favorite){
                        setFavorite(true)
                    }
                    else{
                        setFavorite(false)
                    }

                } else {
                    alert('좋아요 정보를 가져오는 것을 실패 하였습니다.')
                }
            })


    }, [])

    return (

        <div>
            <br />
                <p>
                    
                    { Favorite ? <Tooltip title="이 글 좋아요 취소">
                                        <HeartFilled style={{color : "#ff4d4f"}} onClick={ favoriteClick } />  
                                </Tooltip> :
                                <Tooltip title="이 글 좋아요 클릭">
                                        <HeartOutlined style={{color : "#ff4d4f"}} onClick={ favoriteClick } />
                                </Tooltip>
                    }
                    &nbsp;좋아요 {props.favorite + FavoriteCount} &nbsp; <CommentOutlined /> 댓글 {props.CommentCnt}
                    
                    {/* <Report ></Report>  */}
                    { props.writer && localStorage.getItem('userId') != props.writer && <Report ></Report> } 
                    
                </p>
        </div>
    )
}

export default Favorites
