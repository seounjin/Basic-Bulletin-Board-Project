import React, { useState } from 'react'
import { withRouter, Link } from 'react-router-dom';
import { Form, Input, Button } from 'antd';
import axios from 'axios';
import { encryptPassword } from '../../api/index';

function ChangePrivacy(props) {

    const [Password, setPassword] = useState("");
    const [ConfirmPassword, setConfirmPassword] = useState("");
    const [Email, setEmail] = useState(props.location.state.Email);

    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value)
      }
    
    const onConfirmPasswordHandler = (event) => {
        setConfirmPassword(event.currentTarget.value)
    }

    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value)
    }

    const modifyPrivacy = (event) => {

        event.preventDefault();

        console.log("이메일", props.location.state.Email)

        if(!Password) {
            return alert('비밀번호를 입력해주세요.')
          }
  
        if(Password !== ConfirmPassword) {
          return alert('비밀번호가 일치하지 않습니다.')
        }

        if(Password.length > 20 || Password.length < 8) {
            return alert('비밀번호를 8 ~ 20 자리로 입력해주세요.')
        }


        encryptPassword(Password)
            .then(encryption => {
            
                const body = {
                    id : localStorage.getItem('userId'),
                    password : encryption,
                    email : Email
                }
        
                axios.post('/api/mypage/change', body)
                      .then(response => {
                          if (response.data.success) {
                              alert('개인정보가 변경되었습니다.')
                              props.history.push(`/mypage`)
                          } else {
                            return alert('개인정보를 변경하는데 실패하였습니다.')
                          }
                      })
        
        });

        
    };

    return (
        <div style={{ position: "absolute", top: '30%', left: '50%', transform: 'translate(-50%, -50%)' }}>
            
            <h2 style={{ marginLeft: 55 }}> 개인정보 변경 </h2>
            <br/>
            <Form>
                <Form.Item
                    name="email"
                    rules={[
                    {
                        type: 'email',
                        message: '올바른 이메일 형식이 아닙니다.',
                    },
                    {
                        required: true,
                        message: '이메일을 입력해주세요.',
                    },
                    ]}
                >
                    <Input placeholder="이메일 입력" defaultValue={props.location.state.Email} onChange={onEmailHandler} />
                </Form.Item>

                <Form.Item
                    name="password"
                    rules={[
                    {
                        type: 'string',
                        message: '8 ~ 20 자리로 입력해주세요.',
                        min: 8,
                        max: 20
                    },
                    {
                        required: true,
                        message: '비밀번호를 입력해주세요.',
                    },
                    ]}
                >
                    <Input.Password placeholder="비밀번호 입력" onChange={onPasswordHandler}/>
                </Form.Item>

                <Form.Item
                    name="confirm"
                    dependencies={['password']}
                    rules={[
                    {
                        required: true,
                        message: '비밀번호를 확인해주세요.',
                    },
                    ({ getFieldValue }) => ({
                        validator(rule, value) {
                        if (!value || getFieldValue('password') === value) {
                            return Promise.resolve('비밀번호가 일치합니다.');
                        }
                        return Promise.reject('비밀번호가 일치하지 않습니다.');
                        },
                    }),
                    ]}
                >
                    <Input.Password placeholder="비밀번호 확인" onChange={onConfirmPasswordHandler} />
                </Form.Item>
                <div style={{transform: 'translate( -25%, 20%)'}}>
                    <Button style={{ marginLeft: 120 }} >
                        <Link to={{pathname : `/mypage` }}>취 소</Link>
                    </Button>
                    <Button style={{ marginLeft: 10 }} onClick={modifyPrivacy} >
                        변 경
                    </Button>
                </div>
            </Form>
        </div>
    );
};

export default withRouter(ChangePrivacy)
