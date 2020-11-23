import React from 'react'
import { Menu } from 'antd';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { useSelector } from "react-redux";

function RightMenu(props) {

    const user = useSelector(state => state.user)
    //window.sessionStorage.setItem('totalActivityPost', 0);
    //window.sessionStorage.setItem('totalActivityComment', 0);
    //console.log("RightMenu", window.sessionStorage.totalActivityPost, window.sessionStorage.totalActivityComment)

    const { SubMenu } = Menu;

    const logoutHandler = () => {
        axios.get('/api/user/logout')
            .then(response => {
                if(response.data.success) {
                    window.localStorage.clear();
                    props.history.push("/login")
                    alert('안녕히가세요~!')
                    // window.location.reload();
                }
                else {
                    alert('로그아웃 실패')
                }
            })
    }

    
    if (user.userData && !user.userData.isAuth) {

        return (
            <Menu mode={props.mode}>
                <Menu.Item key="signin">
                    <a href="/login">Sign in</a>
                </Menu.Item>
                <Menu.Item key="app">
                    <a href="/register">Sign up</a>
                </Menu.Item>
            </Menu>    
        )
    } 
    else if(user.userData && user.userData.isAdmin){
        return (
            <Menu mode={props.mode} >
                <SubMenu title="Admin">
                    <Menu.ItemGroup title="신고 현황">
                        <Menu.Item key="reportPost"> <a href="/reportPost"> 게시글 신고  </a> </Menu.Item>
                        <Menu.Item key="reportComment"> <a href="/reportComment"> 댓글 신고  </a></Menu.Item>
                    </Menu.ItemGroup>
                </SubMenu>
                <Menu.Item key="mypage">
                    <a href="/mypage">Mypage</a>
                </Menu.Item>
                <Menu.Item key="logout">
                    <a onClick={logoutHandler}>Logout</a>
                </Menu.Item>
            </Menu>
        )
    }
    else {
        return (
            <Menu mode={props.mode}>
                <Menu.Item key="mypage">
                        <a href="/mypage">My page</a>
                    </Menu.Item>
                <Menu.Item key="logout">
                    <a onClick={logoutHandler}>Logout</a>
                </Menu.Item>
            </Menu>
        )
    }
}

export default withRouter(RightMenu);
