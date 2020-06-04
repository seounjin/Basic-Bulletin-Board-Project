import React from 'react';
import { List, Avatar, Typography } from 'antd';
import { withRouter } from 'react-router-dom';
import { UserOutlined } from '@ant-design/icons';
import Comments from './Sections/Comments';
import SingleComment from './Sections/SingleComment';

function BoardForm(props) {

    
    const { Title } = Typography;

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
            </div>

            {/* 코멘트 */}
            <div>
                <br />
                <p> (게시글좋아요), 댓글 수</p>
                <hr />

                <Comments></Comments>
            </div>

        </div>
    )
}

export default withRouter(BoardForm)
