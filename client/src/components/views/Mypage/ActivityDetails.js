import React, { useEffect, useState } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Pagination } from 'antd';
import { requestMypageList } from '../../../_actions/mypage_action';
import queryStirng from 'query-string'

function ActivityDetails(props) {

    const [List, setList] = useState([]);
    const dispatch = useDispatch();
    const [Total, setTotal] = useState(0);
    const [TypeName, setTypeName] = useState(() => {

        if (props.location.state) {
            if (props.location.state.con === "0") {
                window.sessionStorage.setItem('con', "0");
                return "게시물"
            }
            else {
                window.sessionStorage.setItem('con', "1");
                return "댓글이 작성된 게시물"
            }
        }
        else {
            if (window.sessionStorage.con === "0") {
                return "게시물"
            }
            else {
                return "댓글이 작성된 게시물"
            }
        }
    });

    const getPageSize = () => {
        const { search } = props.location;
        const queryObj = queryStirng.parse(search);
        const { list_num } = queryObj;
 
        if (list_num) {
            return parseInt(list_num)
        } else{
            return 10
        }
    }

    useEffect(() => {

        requestActivity()
    }, [props.match.params.pageNum,getPageSize()])

    const onShowSizeChange = (current, pageSize) => {

        const body = {
            currentPage : props.match.params.pageNum,
            pageSize : getPageSize(),
            type : TypeName,
            id : localStorage.getItem('userId')
        }

        dispatch(requestMypageList(body))
            .then(response =>{
            if (response.payload.success){
                console.log("onShowSizeChange", response.payload.pageData.totalPage);
                setList(response.payload.activityList);
                setTotal(response.payload.pageData.totalPage);
                props.history.push(`${current}?list_num=${pageSize}`);
            } else {
                alert('정보를 가져오는데 실패했습니다.');
            }
        })

        window.scrollTo(0,0);
    }

    //페이지네이션
    const pageSelect = (page) => {

        const body = {
            currentPage : page,
            pageSize : getPageSize(),
            type : TypeName,
            id : localStorage.getItem('userId')
        }

        dispatch(requestMypageList(body))
            .then(response =>{
            if (response.payload.success){
                console.log("pageSelect", response.payload.pageData.totalPage);
                setList(response.payload.activityList);
                setTotal(response.payload.pageData.totalPage);

                if (getPageSize() === 10){
                    props.history.push(`${page}`)
                }
                else {
                    props.history.push(`${page}?list_num=${getPageSize()}`)
                }
            } else {
                alert('정보를 가져오는데 실패했습니다.');
            }
        })

        window.scrollTo(0,0);
    }

    const requestActivity = () => {

        const body = {
            currentPage : props.match.params.pageNum,
            pageSize : getPageSize(),
            type : TypeName,
            id : localStorage.getItem('userId')
        }

        dispatch(requestMypageList(body))
            .then(response =>{
            if (response.payload.success){
                console.log("requestActivity", response.payload);
                setList(response.payload.activityList);
                setTotal(response.payload.pageData.totalPage);
            } else {
                alert('정보를 가져오는데 실패했습니다.');
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
            <td style={{ width: '10%' }}>{ list.date }</td>
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

            <div style={{textAlign: 'center', transform: 'translate( 0%, 70%)'}}>
                <Pagination
                    showSizeChanger
                    onShowSizeChange={onShowSizeChange}
                    current={parseInt(props.match.params.pageNum)}
                    total={ Total }
                    onChange = {pageSelect}
                    pageSizeOptions = {[10,15,20,30]}
                    pageSize = {getPageSize()}
                />
            </div>
            
        </div>
    )
}

export default withRouter(ActivityDetails)
