import React, { useEffect, useState } from 'react';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import axios from 'axios';


function Favorites(props) {

    const [Favorite,setFavorite] = useState(false);

    const favoriteClick = () => {

        // 좋아요 버튼을 안눌렀을 때
        if(!Favorite){
            setFavorite(true)
        }else{ //좋아요 버튼을 눌럿을 때
            setFavorite(null)
        }
    }

    useEffect(() => {

        // 게시판 번호, 접속중인 아이디
        const body = {
            postNum : props.postNum.postNum, 
            userId : localStorage.getItem('userId')
        }

        //해당 사용자가 좋아요 버튼을 눌렀는지 안눌렀는지 확인하기위해 좋아요 정보를 가져 옴
        axios.post('/api/board/favorite', body)
            .then(response => {
                if(response.data.success){
                    
                    console.log("aaaaaaaa", response.data.favorite)
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
                        { Favorite ?  <HeartFilled style={{color :"#ff4d4f"}} onClick={ favoriteClick } />  :
                                      <HeartOutlined style={{color :"#ff4d4f"}} onClick={ favoriteClick } />
                        } 
                        좋아요(숫자), 댓글 수 </p>
                <hr />
        </div>
    )
}

export default Favorites
