import React from 'react'
import { withRouter } from 'react-router-dom'
import Page from './Sections/Page';
import '../BoardPage/board.css';


function ReportPost(props) {

    window.sessionStorage.setItem('currentDoc', '/reportPost/');

    return (
        <div style={{ width: '85%', margin: '3rem auto' }}>

            <Page getRouter={'/api/report/post'} deleteRouter={'/api/report/post/1'}
                state={'reportPost'}
            
            ></Page>
          
        </div>
    )
}

export default withRouter(ReportPost);
