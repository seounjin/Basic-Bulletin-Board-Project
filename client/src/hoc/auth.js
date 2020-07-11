import React, {useEffect} from 'react';
import { useDispatch } from 'react-redux'
import { auth } from '../_actions/user_actions';

export default function(SpecificComponent, option, adminRoute = null) {

    //option 
    //null  => 아무나 출입이 가능
    //true  => 로그인한 유저만 출입 가능 페이지
    //false => 로그인한 유저는 출입 불가능한 페이지
    function AuthenticationCheck(props) {

        const dispatch = useDispatch()

        useEffect(() => {

            dispatch(auth()).then(response => {
                console.log(response)

                // if(response.payload.exp){
                //     alert('로그인 만료되었습니다')
                //     props.history.push('/login')
                // } window.sessionStorage.clear();

                //로그인 하지 않은 상태
                if(!response.payload.isAuth) {
                    
                    if(response.payload.exp){
                        window.sessionStorage.clear();
                        alert('로그인 만료되었습니다');
                    }
                    
                    if(option) {
                        props.history.push('/login')
                    }

                }
                else { //로그인 상태
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

        return <SpecificComponent />

    }

    return AuthenticationCheck
}