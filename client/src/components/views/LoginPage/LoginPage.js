import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { loginUser } from '../../../_actions/user_actions';
import { withRouter } from 'react-router-dom'
import moment from 'moment';
import { encryptPassword } from '../../api/index';



function LoginPage(props) {

    const dispatch = useDispatch();

    const [Id, setId] = useState("");
    const [Password, setPassword] = useState("");

    const onIdHandler = (event) => {
        setId(event.currentTarget.value)
    }
    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value)
    }

    const onSubmitHandler = (event) => {
        event.preventDefault();

        encryptPassword(Password)
            .then(encryption => {
            
            const body = {
                id: Id,
                password: encryption,
                loginDate: moment().format('YYYY-MM-DD HH:mm:ss')
            }
            
                dispatch(loginUser(body))
                .then(response => {
                    if (response.payload.loginSuccess) {
                        props.history.push('/');
                        window.localStorage.setItem('userId', response.payload.userId);
                        alert('환영합니다.')
                    } else {
                        alert('아이디와 비밀번호를 확인해주세요.')
                    }
                })
        
        
        });

    }

    return (
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center'
            , width: '100%', height: '50vh'
        }}>
            <form style={{ display: 'flex', flexDirection: 'column' }}
                onSubmit={onSubmitHandler}
            >
                <label>I D</label>
                <input type="id" value={Id} onChange={onIdHandler} />
                <label>Password</label>
                <input type="password" value={Password} onChange={onPasswordHandler} />
                <br />
                <button type="submit">
                    Login
                </button>
            </form>
        </div>
    )
}

export default withRouter(LoginPage)
