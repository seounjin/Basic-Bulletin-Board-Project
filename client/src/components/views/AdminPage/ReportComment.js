import React from 'react'
import { withRouter } from 'react-router-dom'
import Page from './Sections/Page';
import '../BoardPage/board.css';


function ReportComment(props) {

    window.sessionStorage.setItem('currentDoc', '/reportComment/');

    return (
        <div style={{ width: '85%', margin: '3rem auto' }}>

            <Page getRouter={'/api/report/comment'} deleteRouter={'/api/report/comment/1'}
                state={'reportComment'}
            
            ></Page>
          
        </div>
    )


}

export default withRouter(ReportComment);
