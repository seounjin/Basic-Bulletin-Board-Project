import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import Page from '../AdminPage/Sections/Page';

function MyReport(props) {

    const [Report, setReport] = useState("MyReportPost");

    const handleMenuClick = (event) => {

        if (event.key === '1'){
            setReport("MyReportPost");
        } else if (event.key === '2') {
            setReport("MyReportComment");
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
            <div style={{ textAlign: 'right'}}>
              <Dropdown overlay={menu}>
                
                  <a style={{fontSize: '19px'}} className="ant-dropdown-link" onClick={e => e.preventDefault()} >
                    { Report == 'MyReportPost' ? "게시물" : "댓글" } <DownOutlined />
                  </a>
              </Dropdown>  
            </div>
            
            <Page getRouter={'/api/mypage/get' + Report} deleteRouter={'/api/mypage/cancel' + Report} state={'myReport'} ></Page>

        </div>
    )
}

export default withRouter(MyReport);
