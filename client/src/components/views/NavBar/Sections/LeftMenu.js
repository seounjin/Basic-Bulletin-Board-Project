import React from 'react'
import { Menu } from 'antd';

function LeftMenu(props) {
    return (

        <Menu mode={props.mode}>
            <Menu.Item key="board">
                <a href="/board/1">board</a>
            </Menu.Item>

            {/* <Menu.Item key="write">
                <a href="/board/write">write</a>
            </Menu.Item> */}
        </Menu>
    )
}

export default LeftMenu
