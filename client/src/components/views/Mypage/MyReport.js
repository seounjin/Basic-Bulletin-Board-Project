import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import Page from '../AdminPage/Sections/Page';

function MyReport(props) {

    const [Report, setReport] = useState(1);
    const [Cancel, setCancel] = useState(3);
    
    const handleMenuClick = (event) => {

        if (event.key === '1'){
            setReport(1);
            setCancel(3);
        } else if (event.key === '2') {
            setReport(2);
            setCancel(4);
        }
    }

    const menu = (
        <Menu onClick={handleMenuClick}>
          <Menu.Item key="1">
            <a target="_blank" rel="noopener noreferrer">
              게시물
            </a>
          </Menu.Item>
          <Menu.Item key="2">
            <a target="_blank" rel="noopener noreferrer">
              댓글
            </a>
          </Menu.Item>
        </Menu>
      );

    return (
        
        <div style={{ width: '85%', margin: '3rem auto' }}>
            <div style={{ textAlign: 'right', transform: 'translate( -1%, 120%)'}}>
              <Dropdown overlay={menu}>
                
                  <a style={{fontSize: '19px'}} className="ant-dropdown-link" onClick={e => e.preventDefault()} >
                    { Report === 1 ? "게시물" : "댓글" } <DownOutlined />
                  </a>
              </Dropdown>  
            </div>
            
            {props.user.userData && 
              <Page getRouter={'/api/mypage/report/' + Report} deleteRouter={'/api/mypage/report/' + Cancel} state={'myReport'} userId={props.user.userData.id}></Page>
            }

            {/* <Page getRouter={'/api/mypage/report/' + Report} deleteRouter={'/api/mypage/report/' + Cancel} state={'myReport'} userId={props.user.userData.id}></Page> */}

        </div>
    )
}

export default withRouter(MyReport);
