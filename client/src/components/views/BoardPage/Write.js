import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import { withRouter } from 'react-router-dom'
import axios from 'axios';
import { useSelector } from 'react-redux';
import moment from 'moment';

function Write(props) {

  const [Title, setTitle] = useState("");
  const [Content, setContent] = useState("");
  const user = useSelector(state => state.user)

  const onTitleHandler = (event) => {
    setTitle(event.currentTarget.value)
  }

  const onContentHandler = (event) => {
    setContent(event.currentTarget.value)
  }

  const layout = {
    wrapperCol: {
      span: 16,
    },
  };

  // 제출을 눌렀을 때
  const createPost = (event) => {
      event.preventDefault();

      if(!Title || !Content) {
        return alert('빈 곳이 없는지 확인해주세요!!')
      }

      //pContent : Content.replace(/(\n|\r\n)/g, '<br/>')
      const body = {
        writer : user.userData.id,
        date : moment().format('YYYY-MM-DD HH:mm:ss'),
        title : Title,
        pContent : Content
      }

      axios.post('/api/board/createPost', body)
            .then(response => {
                if (response.data.success) {
                  props.history.push("/board")
                } else {
                    alert('글 작성에 실패했습니다.')
                }
            })
    };

    return (
      <div style={{ alignItems: 'center', width: '60%', margin: '5rem auto' }}>

            <h2> 글쓰기 </h2>
            <br></br>

            <Form {...layout} name="write" label="글쓰기" >
            
            <Form.Item
              name={['post', 'title']}
              label="제 목"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input value={Title} onChange={onTitleHandler} />
            </Form.Item>

            <Form.Item 
              name={['post', 'mainText']} 
              label="내 용"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input.TextArea value={Content} onChange={onContentHandler} rows={10} />
            </Form.Item>

            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 16 }}>
              <Button onClick={createPost} type="primary" htmlType="submit">
                제출
              </Button>
            </Form.Item>

          </Form>

        </div>
    )
}

export default withRouter(Write)