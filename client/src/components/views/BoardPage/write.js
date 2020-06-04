import React from 'react'
import { Form, Input, InputNumber, Button,  } from 'antd';
import { withRouter } from 'react-router-dom'

function write(props) {

    const layout = {
        labelCol: {
          span: 8,
        },
        wrapperCol: {
          span: 16,
        },
    };

    const validateMessages = {
        required: '${label} is required!',
        types: {
          email: '${label} is not validate email!',
          number: '${label} is not a validate number!',
        },
        number: {
          range: '${label} must be between ${min} and ${max}',
        },
    };

    // const Demo = () => {
    //     const onFinish = values => {
    //       console.log(values);
    // }};

    return (
        <div style={{ width: '70%', paddingLeft: '30px' , paddingTop: '150px' }}>

          <Form {...layout} name="nest-messages" label="글쓰기" /*onFinish={onFinish}*/ validateMessages={validateMessages}>

          <h2 style={{ paddingLeft: '150px', paddingBottom: '20px'}}>글쓰기</h2>
            
            <Form.Item
              name={['post', 'title']}
              label="제 목"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
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
              <Input.TextArea />
            </Form.Item>

            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
              <Button type="primary" htmlType="submit">
                제 출
              </Button>
            </Form.Item>
          </Form>
        </div>
    )
}

export default withRouter(write)