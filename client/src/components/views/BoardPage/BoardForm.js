import React, { useEffect, useState } from 'react';
import { List, Avatar, Typography } from 'antd';
import { withRouter } from 'react-router-dom';
import { UserOutlined } from '@ant-design/icons';
import Comments from './Sections/Comments';
import { useDispatch } from 'react-redux';
import { requestBoardForm } from '../../../_actions/board_actions';

import SingleComment from './Sections/SingleComment';

function BoardForm(props) {

    
    const { Title } = Typography;
    const dispatch = useDispatch(); 
    const [content, setcontent] = useState([]);
    //const postNum = props.match.params.postNum;
    
    let body = {
        postNum : props.match.params.postNum
    }

    useEffect(()=>{

        dispatch(requestBoardForm(body))
            .then(response =>{
                console.log("게시판 내용",response)

            if (response.payload.success){
                setcontent(response.payload.content[0].pContent);
                console.log("콘텐츠의 내용!!!  ", content)
                console.log("콘텐츠의 내용!!!!!!!!!  ", response.payload.content[0].pContent)
            } else {
                alert('게시판 내용을 가져오는데 실패했습니다.')
            }
        })
    
    },[])


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
                    title={ "아이디" }
                    description={ "날짜 , 조회수" }
                />
             </List.Item>
            <hr />


            <div>
                {/* 글쓰여진 부분 */}
                {content && 
                    <p2>content</p2>
                }
                <p>이바보야!!!!!!!!!</p>
            </div>

            {/* 코멘트 */}
            <div>
                <br />
                <p> (게시글좋아요), 댓글 수, </p>
                <hr />

                <Comments></Comments>
            </div>

        </div>
    )
}

export default withRouter(BoardForm)
