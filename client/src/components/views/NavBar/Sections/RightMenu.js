import React from 'react'
import { Menu } from 'antd';

function RightMenu(props) {
    return (
        <Menu mode={props.mode}>
            <Menu.Item key="login">
                 <a href="/login">login</a>
            </Menu.Item>
        </Menu>
            
    )
}

export default RightMenu
