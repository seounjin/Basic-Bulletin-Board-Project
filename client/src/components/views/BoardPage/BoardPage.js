import React, { useEffect, useState } from 'react'
import './board.css';
import { withRouter, Link } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { requestBoardList } from '../../../_actions/board_actions';
import { Button, Pagination } from 'antd';


function BoardPage(props) {

    const [List, setList] = useState([])
    const dispatch = useDispatch();

    useEffect(() => {

        //console.log("onShowSizeChange - useEffect", typeof(window.sessionStorage.pageSize))
        //console.log("onShowSizeChange - useEffect", typeof(window.sessionStorage.currentPage))
        
        requestBoard()
        
    }, [])

    const onShowSizeChange = (current, pageSize) => {

        window.sessionStorage.setItem('pageSize', pageSize);
        window.sessionStorage.setItem('currentPage', current);
        //console.log("onShowSizeChange - pageSize", typeof(window.sessionStorage.pageSize))
        //console.log("onShowSizeChange - pageSize", typeof(window.sessionStorage.currentPage))

        requestBoard()

    }

    //페이지네이션
    const pageSelect = (page) => {

        window.sessionStorage.setItem('currentPage', page);

        //console.log("onShowSizeChange - pageSelect", typeof(window.sessionStorage.pageSize))
        //console.log("onShowSizeChange - pageSelect", typeof(window.sessionStorage.currentPage))

        requestBoard()
    }

    const requestBoard = () => {

        let body = {
            currentPage : window.sessionStorage.currentPage,
            pageSize : window.sessionStorage.pageSize
        }

        console.log("requestBoard-body", body)

        dispatch(requestBoardList(body))
            .then(response =>{
            if (response.payload.success){
                setList(response.payload.boardList);
                console.log('response.payload.pageData.totalPage', response.payload.pageData.totalPage)
                window.sessionStorage.setItem('totalPost', response.payload.pageData.totalPage);
                props.history.push(`${window.sessionStorage.currentPage}`)
            } else {
                alert('게시판 정보를 가져오는데 실패했습니다.')
            }

        })
    }

    const boardList = List.map((list, index) => {

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

            <h2> VS 게시판 </h2>

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
                    { boardList }
                </tbody>
            </table>

            <hr />

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                
                <Button type="primary" htmlType="submit">
                    <Link to={{
                        pathname : `/write`,
                        state : 
                            [ 0,
                            "",
                            "",]    
                    }}>글쓰기</Link>
                </Button>

            </div>

            <div>
                <Pagination
                    showSizeChanger
                    onShowSizeChange={onShowSizeChange}

                    current={parseInt(window.sessionStorage.currentPage)}
                    total={window.sessionStorage.totalPost}
                    onChange = {pageSelect}
                    pageSizeOptions = {[10,15,20,30]}
                    pageSize = {parseInt(window.sessionStorage.pageSize)}
                    />
            </div>
            

        </div>
    )
}

export default withRouter(BoardPage)