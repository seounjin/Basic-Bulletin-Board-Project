import React, { useEffect } from 'react'
import { Menu } from 'antd';
import axios from 'axios';

function LeftMenu(props) {

    // window.sessionStorage.setItem('pageSize', 10);
    // window.sessionStorage.setItem('currentPage', 1);

    useEffect(() => {
        // axios.get('/api/hello')
        // .then(response => console.log("response.data",response.data))

        axios.get('/api/board/total')
              .then(response => {
                  if (response.data.success) {
                      //console.log("totalPosttotalPost", typeof(response.data.total.totalPost))
                    window.sessionStorage.setItem('totalPost', response.data.total.totalPost);
                  } else {
                    window.sessionStorage.setItem('totalPost', 0);
                    alert("서버로부터 정보를 얻어오지 못했습니다.")
                  }
              })
    }, [])

    return (

        <Menu mode={props.mode}>
            <Menu.Item key="board">
                <a href={`/board/1`}>board</a>
            </Menu.Item>

            {/* <Menu.Item key="write">
                <a href="/board/write">write</a>
            </Menu.Item> */}
        </Menu>
    )
}

export default LeftMenu
