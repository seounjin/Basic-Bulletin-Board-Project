import React,{ useEffect } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

function LandingPage(props) {
    
    // window.sessionStorage.setItem('pageSize', 10);
    // window.sessionStorage.setItem('currentPage', 1);

    // useEffect(() => {
    //     // axios.get('/api/hello')
    //     // .then(response => console.log("response.data",response.data))

    //     axios.post('/api/board/getTotal')
    //           .then(response => {
    //               if (response.data.success) {
    //                   console.log("totalPosttotalPost", typeof(response.data.total.totalPost))
    //                 window.sessionStorage.setItem('totalPost', response.data.total.totalPost);
    //               } else {
    //                 window.sessionStorage.setItem('totalPost', 0);
    //                 alert("서버로부터 정보를 얻어오지 못했습니다.")
    //               }
    //           })

    // }, [])

    return (
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center'
            , width: '100%', height: '100vh'
        }}>
            <h2>시작 페이지</h2>

        </div>
    )
}

export default withRouter(LandingPage)