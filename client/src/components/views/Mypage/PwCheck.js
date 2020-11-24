import React, { useEffect, useState } from 'react'
import { Form, Input, InputNumber, Button } from 'antd';
import { withRouter, Link } from 'react-router-dom';
import axios from 'axios';
import { encryptPassword } from '../../api/index';

function PwCheck(props) {

    const [Password, setPassword] = useState("");

    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value)
    }

    const passwordCheck = (event) => {

        event.preventDefault();
  
        if(!Password) {
          return alert('비밀번호를 입력해주세요.')
        }

        console.log("이메일", props.location.state.Email)


        encryptPassword(Password)
            .then(encryption => {

                console.log("encryption",encryption);
                const body = {
                    id : localStorage.getItem('userId'),
                    password : encryption
                }

                axios.post('/api/mypage/check', body)
                    .then(response => {
                        if (response.data.success) {
                            setPassword("");
                            props.history.push({
                                pathname: `/changeprivacy`,
                                state: {Email: props.location.state.Email}
                            })
                        } else {
                            return alert('비밀번호를 확인해주세요.')
                        }
                    });

        });

    };

    return (
        <div style={{ position: "absolute", top: '30%', left: '50%', transform: 'translate(-50%, -50%)' }}>
            <h2 style={{ marginLeft: 50 }}> 비밀번호 확인 </h2>
            <br /><br />
            <Form.Item >
                <Input defaultValue={localStorage.getItem('userId')} disabled={true} />
            </Form.Item>
            <Form.Item >
                <Input.Password value={Password} placeholder="비밀번호 입력" onChange={onPasswordHandler} maxLength={20} />
            </Form.Item>
            <div style={{transform: 'translate( -25%, 20%)'}}>
                <Button style={{ marginLeft: 120 }} >
                    <Link to={{pathname : `/mypage` }}>이 전</Link>
                </Button>
                <Button type="submit" onClick={passwordCheck} style={{ marginLeft: 10 }} >
                    다 음
                </Button>
            </div>
        </div>
    )
}

export default withRouter(PwCheck)
