import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Pagination } from 'antd';
import queryStirng from 'query-string';
import PageList from './PageList';
import { withRouter } from 'react-router-dom'



function Page(props) {

    const [List, setList] = useState([]);
    const [Total, setTotal] = useState(0);
    const [CurrentPage, setCurrentPage] = useState(() =>{

        const { search } = props.location;
        const queryObj = queryStirng.parse(search);
        const { page } = queryObj;
        
        if (page) {
                return parseInt(page)
            } else{
                return 1
            }

    });

    useEffect(() => {

        const body = {
            currentPage: CurrentPage
        }

        axios.post(props.getRouter, body)
            .then(response => {
                if(response.data.success){
                    setList(response.data.data);
                    setTotal(response.data.Count.count);
                } else {
                    alert('신고된 정보를 가져오지 못하였습니다')
                }
            })


    },[])
    
    const deleteClick = (data) => {
        
        // data
        // comment: cGroupSquence
        // Post: pNum
        const body = {
            data: parseInt(data)
        }

        axios.post(props.deleteRouter, body)  
            .then(response => {
                if(response.data.success){
                    switch(props.state) {
                        case 'reportComment':
                            setList(List.filter(list => list.cGroupSquence !== data));
                        case 'reportPost':
                            setList(List.filter(list => list.pNum !== data));
                    }
                    alert('삭제 성공');
                } else {
                    alert('삭제 실패');
                }
            })

    };


    const pageSelect = (page) => {

        const body = {
            currentPage: page
        };

        console.log("페이지",page)
        axios.post(props.getRouter, body)
            .then(response => {
                if(response.data.success){
                    setList(response.data.data);
                    setTotal(response.data.Count.count);
                    setCurrentPage(page);
                    props.history.push(`${props.state}?page=${page}`);

                } else {
                    alert('신고된 정보를 가져오지 못하였습니다')
                }
            })
    };

    

    return (
        <div>
            
            <PageList pageList={List} deleteClick={deleteClick} state={props.state} ></PageList>

            <div>
                <Pagination
                    current={CurrentPage}
                    total={Total}
                    onChange={pageSelect}
                />
            </div>
        </div>
    )
}

export default withRouter(Page);
