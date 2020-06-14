import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import { withRouter } from 'react-router-dom'
import axios from 'axios';
import { useSelector } from 'react-redux';
import moment from 'moment';

function Write(props) {

  console.log("111122222111111", props.location.state[0])
  console.log("11111111111111", props.location.state[1])
  console.log("11111111111111", props.location.state[2])

  const [Title, setTitle] = useState(props.location.state[1]);
  const [Content, setContent] = useState(props.location.state[2]);
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

      if (props.location.state[0] === 0) {

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
      } 
      else {

        const body = {
          pNum : props.location.state[0],
          title : Title,
          pContent : Content
        }
        
        // https://stackoverrun.com/ko/q/12507405
        axios.post('/api/board/modifyPost', body)
              .then(response => {
                  if (response.data.success) {
                    props.history.push(`/board`)
                  } else {
                      alert('글 수정에 실패했습니다.')
                  }
              })
      }
    };

    return (
      <div style={{ alignItems: 'center', width: '60%', margin: '5rem auto' }}>

            <h2> 글쓰기 </h2>
            <br></br>

            <Form {...layout} name="write" label="글쓰기" >
            
            <Form.Item
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