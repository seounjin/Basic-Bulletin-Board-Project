 import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../../_actions/user_actions';
import { withRouter } from 'react-router-dom'

function RegisterPage(props) {

    const dispatch = useDispatch();

    const [Id, setId] = useState("");
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [ConfirmPassword, setConfirmPassword] = useState("");


    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value)
    }

    const onIdHandler = (event) => {
        setId(event.currentTarget.value)
    }

    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value)
    }

    const onConfirmPasswordHandler = (event) => {
        setConfirmPassword(event.currentTarget.value)
    }



    const onSubmitHandler = (event) => {
        event.preventDefault();

        if(Password !== ConfirmPassword) {
            return alert('password not same')
        }

        let body = {
            id: Id,
            password: Password,
            email: Email
        }

        dispatch(registerUser(body))
            .then(response => {
                if (response.payload.success) {
                    props.history.push("/login")
                } else {
                    alert('Failed to sign up!')
                }
            })
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
