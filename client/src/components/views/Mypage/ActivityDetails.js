import React, { useEffect, useState } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Button, Pagination } from 'antd';
import { requestMypageList } from '../../../_actions/mypage_action';

function ActivityDetails(props) {

    console.log("props.history",props.history)

    console.log('ggggggggggg', window.sessionStorage.totalPost, window.sessionStorage.totalActivityPost, window.sessionStorage.totalActivityComment)

    console.log("props.location", props.location.state)

    const [List, setList] = useState([]);
    const dispatch = useDispatch();

    const [TypeName, setTypeName] = useState("");

    // const [TypeName, setTypeName] = useState(() =>{

    //     if (!props.location.state.con) {
    //         if(props.location.state.con === 1) {
    //             console.log("props.location", props.location.state)
    //             return "게시물";
    //         }
    //         else {
    //             return "댓글이 작성된 게시물";
    //         }   
    //     }

    // });

    useEffect(() => {

        requestActivity()
        
    }, [])

    const onShowSizeChange = (current, pageSize) => {

        window.sessionStorage.setItem('pageSize', pageSize);
        window.sessionStorage.setItem('currentPage', current);

        requestActivity()
        window.scrollTo(0,0);
    }

    //페이지네이션
    const pageSelect = (page) => {

        window.sessionStorage.setItem('currentPage', page);

        requestActivity()
        window.scrollTo(0,0);
    }

    const requestActivity = () => {

        let body = {
            currentPage : window.sessionStorage.currentPage,
            pageSize : window.sessionStorage.pageSize,
            type : TypeName,
            id : localStorage.getItem('userId')
        }

        dispatch(requestMypageList(body))
            .then(response =>{
            if (response.payload.success){
                setList(response.payload.activityList);
                //console.log('response.payload.pageData.totalPage', response.payload.pageData.totalPage)
                //window.sessionStorage.setItem('totalPost', response.payload.pageData.totalPage);
                //props.history.push(`${window.sessionStorage.currentPage}`)
            } else {
                alert('게시판 정보를 가져오는데 실패했습니다.')
            }

        })
    }

    const activityList = List.map((list, index) => { 

        return <tr key = { index }>
            <td style={{ width: '8%' }}>{ list.postnum }</td>
            <td style={{ width: '40%' }}><Link to={{
                pathname : `/boardform/${list.postnum}` 
            }}>{ list.title }</Link></td>
            <td style={{ width: '20%' }}>{ list.writer }</td>
            <td style={{ width: '10%' }}>{ list.d }</td>
            <td style={{ width: '10%' }}>{ list.views }</td>
            <td style={{ width: '10%' }}>{ list.favorite }</td>
        </tr>

    })

    return (
        <div style={{ width: '85%', margin: '3rem auto' }}>

            <h2> {localStorage.getItem('userId')}님의 { TypeName } </h2>

            <hr />

            <table>
                <thead>
                    <tr>
                        <th>번 호</th>
                        <th>제 목</th>
                        <th>작성자</th>
                        <th>작성일</th>
                        <th>조 회</th>
                        <th>좋아요</th>
                    </tr>
                </thead>
                <tbody>
                    { activityList }
                </tbody>
            </table>

            <hr />
            <br />

            <div>
                <Pagination
                    showSizeChanger
                    onShowSizeChange={onShowSizeChange}
                    current={parseInt(window.sessionStorage.currentPage)}
                    total={ window.sessionStorage.totalPost }
                    onChange = {pageSelect}
                    pageSizeOptions = {[10,15,20,30]}
                    pageSize = {parseInt(window.sessionStorage.pageSize)}
                />
            </div>
            
        </div>
    )
}

export default withRouter(ActivityDetails)
