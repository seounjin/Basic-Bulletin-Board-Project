import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { auth } from '../_actions/user_actions';
import axios from 'axios';


export default function(SpecificComponent, option, adminRoute = null) {

    //option 
    //null  => 아무나 출입이 가능
    //true  => 로그인한 유저만 출입 가능 페이지
    //false => 로그인한 유저는 출입 불가능한 페이지
    function AuthenticationCheck(props) {

        const dispatch = useDispatch();
        let user = useSelector(state => state.user);

        useEffect(() => {

            dispatch(auth()).then(response => {
                console.log("auth", response);
                
                

                //로그인 하지 않은 상태
                if(!response.payload.isAuth) {
                    
                    if(option) {
                        props.history.push('/login')
                    }

                }
                else { //로그인 상태
                    
                    if(response.payload.exp){
                        // 토큰 요청
                        axios.get('/api/user/token')
                            .then(response => {
                            if (response.data.success) {
                                console.log("토큰 재발급 성공");
                            } else{
                                console.log("토큰 재발급 실패");
                            }
                        });
                    }
                    
                    //관리자가 아닌데 관리자 페이지에 들어가질 경우.
                    if(adminRoute && !response.payload.isAdmin) {
                        props.history.push('/')
                    }
                    else {
                        if(option === false) {
                            props.history.push('/')
                        }
                    }
                }

            })

        }, [])

        return (<SpecificComponent {...props} user={user}/>)

    }

    return AuthenticationCheck
}