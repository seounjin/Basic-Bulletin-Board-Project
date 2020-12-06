import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import { withRouter } from 'react-router-dom'
import axios from 'axios';
import { useSelector } from 'react-redux';
import moment from 'moment';

function Write(props) { //props.location.state[n] ([0] 새로쓰기인지 수정인지 구분, [1] 글제목, [2] 글내용 ) 

  console.log("props history", props.location.history)

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

      const body = {
        writer : user.userData.id,
        date : moment().format('YYYY-MM-DD HH:mm:ss'),
        title : Title,
        pContent : Content
      }

      //글 생성
      axios.post('/api/board/new', body)
            .then(response => {
                if (response.data.success) {
                  console.log("postNum", response.data.postNum)
                  props.history.replace(`/boardform/${response.data.postNum}`)
                  window.sessionStorage.setItem('currentPage', 1);
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
        
        // 게시글 내용 수정
        // https://stackoverrun.com/ko/q/12507405
        axios.post('/api/board/post/change', body)
              .then(response => {
                  if (response.data.success && !response.data.isSame) {
                    props.history.push(`/boardform/${props.location.state[0]}`)
                  } else {
                    if (response.data.isSame) {
                      alert('기존 내용으로 게시글을 수정할 수 없습니다.')
                      props.history.goBack();
                      props.history.replace(`/boardform/${props.location.state[0]}`)
                    } else {
                      alert('글 수정에 실패했습니다.')
                    }
                  }
              })
      }
    };

    return (
      <div style={{ position: "absolute", width: '60%', top: '40%', left: '57%', transform: 'translate(-50%, -50%)' }}>

          <h2> 글쓰기 </h2>
          <br></br>

        <div>
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
                <Button style={{ width: '80px' ,transform: 'translate(-45%, -30%)'}} onClick={createPost} type="primary" htmlType="submit">
                  제출
                </Button>
              </Form.Item>
            </Form>
        </div>
      </div>
    )
}

export default withRouter(Write)