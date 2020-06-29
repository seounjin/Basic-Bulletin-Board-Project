import React from 'react'
import { withRouter } from 'react-router-dom'
import Page from './Sections/Page';
import '../BoardPage/board.css';


function ReportPost(props) {

    return (
        <div style={{ width: '85%', margin: '3rem auto' }}>

            <Page getRouter={'/api/report/getReportPost'} deleteRouter={'/api/report/deleteReportPost'}
                state={'reportPost'}
            
            ></Page>
          
        </div>
    )
}

export default withRouter(ReportPost);
