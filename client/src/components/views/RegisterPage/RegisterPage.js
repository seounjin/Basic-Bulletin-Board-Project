import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../../_actions/user_actions';
import { withRouter } from 'react-router-dom'
import { encryptPassword } from '../../api/index';


function RegisterPage(props) {

    const dispatch = useDispatch();

    const [Id, setId] = useState("");
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [ConfirmPassword, setConfirmPassword] = useState("");


    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value);
    }

    const onIdHandler = (event) => {
        setId(event.currentTarget.value);
    }

    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value);
    }

    const onConfirmPasswordHandler = (event) => {
        setConfirmPassword(event.currentTarget.value);
    }

    // 아이디 중복체크 추가해야함
    const onSubmitHandler = (event) => {
        event.preventDefault();

        if(Id.length === 0) {
            return alert('아이디를 입력해주세요');
        }

        if(!/^[a-z0-9]{5,19}$/g.test(Id)){
            return alert('아이디 형식이 올바르지 않습니다');
        }

        if(Password.length === 0) {
            return alert('비밀번호를 입력해주세요');
        }
        
        // 비번 정규식
        if(!/^[A-Za-z0-9]{5,12}$/g.test(Id)){
            return alert('비밀번호 형식이 올바르지 않습니다');
        }

        if(Password !== ConfirmPassword) {
            return alert('password not same');
        }
        
        if(Email.length === 0) {
            return alert('Email을 입력해주세요');
        }

        if(!/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i.test(Email)) {
            return alert('이메일 형식이 올바르지 않습니다');
        }

        encryptPassword(Password)
            .then(encryption => {

            const body = {
                id: Id,
                password: encryption,
                email: Email
            }

                dispatch(registerUser(body))
                .then(response => {
                    if (response.payload.success) {
                        props.history.push("/login");
                        alert('가입 완료');
                    } else {
                        alert('Failed to sign up!');
                    }
        
            });
        });

        
    }

    return (
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center'
            , width: '100%', height: '70vh'
        }}>
            <form style={{ display: 'flex', flexDirection: 'column' }}
                onSubmit={onSubmitHandler}
            >
                <label>I D</label>
                <input type="id" value={Id} onChange={onIdHandler} />

                <label>Password</label>
                <input type="password" value={Password} onChange={onPasswordHandler} />

                <label>Confirm Password</label>
                <input type="password" value={ConfirmPassword} onChange={onConfirmPasswordHandler} />

                <label>Email</label>
                <input type="email" value={Email} onChange={onEmailHandler} />

                <br />
                <button type="submit">
                    회원 가입
                </button>
            </form>
        </div>
    )
}

export default withRouter(RegisterPage)
