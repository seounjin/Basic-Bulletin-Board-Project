import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Pagination } from 'antd';
import queryStirng from 'query-string';
import PageList from './PageList';
import { withRouter } from 'react-router-dom'



function Page(props) {
    const [List, setList] = useState([]);
    const [Total, setTotal] = useState(0);


    const getPageNum = () => {

        const { search } = props.location;
        const queryObj = queryStirng.parse(search);
        const { page } = queryObj;
        
        if (page) {
                return parseInt(page)
            } else{
                return 1
            }

    }


    useEffect(() => {
        
        // axios.get(props.state === 'myReport' ? props.getRouter + `?id=${localStorage.getItem('userId')}&page=${getPageNum()}`: props.getRouter + `/${getPageNum()}`)
        axios.get(props.state === 'myReport' ? props.getRouter + `?id=${props.userId}&page=${getPageNum()}`: props.getRouter + `/${getPageNum()}`)
        .then(response => {
                if(response.data.success){
                    console.log("response.data", response.data);

                    setList(response.data.data);
                    setTotal(response.data.count);
                } else {
                    alert('신고된 정보를 가져오지 못하였습니다')
                }
            })


    },[getPageNum(), props.getRouter])
    
    const deleteClick = (data) => {
        
        // data
        // comment: cGroupSquence
        // Post: pNum
        
       
        console.log("aaaaaaa",data);
        // axios.post(props.deleteRouter, body)
        axios.delete(props.deleteRouter + `/${data}`)  
            .then(response => {
                if(response.data.success){
                    switch(props.state) {
                        case 'reportComment':
                            setList(List.filter(list => list.cGroupSquence !== data));
                            alert("삭제되었습니다.")
                            break;
                        case 'reportPost':
                            setList(List.filter(list => list.pNum !== data));
                            alert("삭제되었습니다.")
                            break;
                        case 'myReport':
                            setList(List.filter(list => list._id !== data));
                            alert("취소되었습니다.")
                            break;
                    }
                } else {
                    alert('실패');
                }
            })

    };


    const pageSelect = (page) => {

        console.log("ppp",page)
        const body = {
            currentPage: page
        };

        axios.get(props.getRouter + `/${page}`)
            .then(response => {
                if(response.data.success){
                    setList(response.data.data);
                    setTotal(response.data.count);
                    props.history.push(`${props.state}?page=${page}`);

                } else {
                    alert('신고된 정보를 가져오지 못하였습니다')
                }
            })
    };

    

    return (
        <div >
            
            <PageList pageList={List} deleteClick={deleteClick} state={props.state} ></PageList>

            <div style={{textAlign: 'center', transform: 'translate( 0%, 70%)'}}>
                <Pagination
                    current={getPageNum()}
                    total={Total}
                    onChange={pageSelect}
                />
            </div>
        </div>
    )
}

export default withRouter(Page);
