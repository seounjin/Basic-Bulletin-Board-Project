import React from 'react'
import { Menu } from 'antd';

function LeftMenu(props) {
    return (
        <Menu mode={props.mode}>
            <Menu.Item key="board">
                <a href="/">board</a>
            </Menu.Item>
        </Menu>
    )
}

export default LeftMenu
